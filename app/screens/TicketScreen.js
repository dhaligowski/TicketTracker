import React, { useState, useEffect, useContext } from "react";
import { Keyboard } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
} from "react-native";
import colors from "../config/colors";
import AppButtonSmall from "../components/AppButtonSmall";
import TicketCard from "../components/TicketCard";
import ticketsApi from "../api/tickets";
import ticketApi from "../api/ticket";
import AuthContext from "../auth/context";

function TicketScreen({ navigation }) {
  const [tickets, setTickets] = useState([]);
  const [searchData, setSearchData] = useState([tickets]);
  const [selectedView, setSelectedView] = useState("Open");
  const [jobSelected, setjobSelected] = useState([]);
  const [] = useState(selectedView);
  const [text, setText] = useState("");
  const authContext = useContext(AuthContext);
  //console.log("authcontext", authContext.user.name);

  React.useEffect(
    () => navigation.addListener("focus", () => loadTickets())
    //[]
  );

  React.useEffect(
    () => navigation.addListener("focus", () => loadSearchData()),
    []
    //console.log("LOAD SEARCH LISTNER")
  );

  useEffect(() => {
    loadTickets();
    //console.log(" USEEFFECT SELECTEDVIEW HOOK", selectedView);
  }, [selectedView]);

  const loadTickets = async () => {
    if (!selectedView) {
      const response = await ticketsApi.getTickets();
      return setTickets(response.data);
    } else {
      const response = await ticketApi.getTicket(selectedView);
      return setTickets(response.data);
    }
  };

  const loadSearchData = async () => {
    const response = await ticketsApi.getTickets();

    setSearchData(response.data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.top}>Ticket Dashboard</Text>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSelectedView("Open")}>
          <Text
            style={[
              styles.headerText,
              selectedView === "Open" && {
                fontWeight: "bold",
                textDecorationLine: "underline",
              },
            ]}
          >
            Open
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedView("Closed")}>
          <Text
            style={[
              styles.headerText,
              selectedView === "Closed" && {
                fontWeight: "bold",
                textDecorationLine: "underline",
              },
            ]}
          >
            {" "}
            Closed
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedView("")}>
          <Text
            style={[
              styles.headerText,
              selectedView === "" && {
                fontWeight: "bold",
                textDecorationLine: "underline",
              },
            ]}
          >
            {" "}
            View All
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.textBoxDescription}
          placeholder="Search by Ticket #"
          textAlignVertical="top"
          placeholderTextColor={"black"}
          onChangeText={(text) => setText(text)}
          value={text}
          keyboardType="number-pad"
          clearTextOnFocus={true}
        />
        <AppButtonSmall
          title="Search"
          onPress={
            parseInt(text, 10) > 0 && parseInt(text, 10) <= searchData.length
              ? () => {
                  setjobSelected(searchData[parseInt(text, 10) - 1]),
                    setText(""),
                    Keyboard.dismiss();
                }
              : () => {
                  alert("Please enter a valid ticket #"), setText("");
                }
          }
        />
      </View>

      <FlatList
        style={styles.jobStyle}
        data={tickets}
        renderItem={({ item }) => (
          <TicketCard
            style={styles.text}
            title={item.value}
            status={item.status}
            subTitle={item.title}
            description={item.description}
            onPress={() => setjobSelected(item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {jobSelected.value && (
        <View style={styles.listStyle}>
          <View style={styles.box}>
            <Text style={styles.selectedJobText}>{jobSelected.value} </Text>
            <Text style={styles.selectedJobText}>
              Status: {jobSelected.status}
            </Text>
            <AppButtonSmall
              title="Update"
              onPress={() => {
                navigation.navigate("TicketDetails", {
                  items: jobSelected,
                  itemIndex: jobSelected.id - 1,
                }),
                  setjobSelected([]);
              }}
            />
            <MaterialCommunityIcons
              name="arrow-collapse-down"
              size={30}
              onPress={() => setjobSelected([])}
              paddingTop={3}
            />
          </View>
          <Text style={styles.selectedJobDescription}>{jobSelected.title}</Text>

          <ScrollView>
            <Text style={styles.selectedJobDescription}>
              {jobSelected.description}
            </Text>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: colors.light,
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonSmall: {
    fontSize: 10,
  },
  header: {
    flexDirection: "row",
    fontSize: 20,
    justifyContent: "space-evenly",
    padding: 15,
  },
  headerTextActive: {
    fontSize: 25,
    textDecorationLine: "underline",
    backgroundColor: colors.light,
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 25,
    backgroundColor: colors.light,
  },
  jobStyle: {
    flexGrow: 0,
  },
  listStyle: {
    height: "70%",
    backgroundColor: colors.light,
    fontSize: 30,
    borderWidth: 3,
    marginBottom: 5,
    borderRadius: 20,
  },
  searchBar: {
    flexDirection: "row",
    paddingBottom: 10,
    justifyContent: "space-evenly",
  },
  selectedJobDescription: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 5,
  },
  selectedJobText: {
    fontSize: 20,
  },
  text: {
    fontSize: 50,
    color: colors.secondary,
  },
  top: {
    fontSize: 40,
    alignSelf: "center",
  },
  underline: {
    textDecorationLine: "underline",
  },
  textBoxDescription: {
    width: "50%",
    borderWidth: 2,
    borderColor: "black",
    paddingLeft: 4,
    fontSize: 20,
    backgroundColor: "white",
  },
  textUnderline: {
    textDecorationLine: "underline",
  },
});

export default TicketScreen;
