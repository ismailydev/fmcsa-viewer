import React, { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import { DataTable, Searchbar } from "react-native-paper";
import { router } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const headers = [
  { width: 200, title: "Created_DT", key: "created_dt" },
  { width: 200, title: "Modified_DT", key: "data_source_modified_dt" },
  { width: 100, title: "Entity", key: "entity_type" },
  { width: 150, title: "Operating status", key: "operating_status" },
  { width: 250, title: "Legal name", key: "legal_name" },
  { width: 200, title: "DBA name", key: "dba_name" },
  { width: 250, title: "Physical address", key: "physical_address" },
  { width: 150, title: "Phone", key: "phone" },
  { width: 100, title: "DOT", key: "usdot_number" },
  { width: 100, title: "MC/MX/FF", key: "mc_mx_ff_number" },
  { width: 100, title: "Power units", key: "power_units" },
  { width: 200, title: "Out of service date", key: "out_of_service_date" },
];

type DataTableProps = {
  data: any[];
};

const CustomDataTable: React.FC<DataTableProps> = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [filter, setFilter] = useState({
    headerIndex: 0,
    query: "",
  });
  const [pagination, setPagination] = useState({
    total: data.length,
    pageSize: 15,
    currentPage: 0,
  });

  const onFilter = (clear?: boolean) => {
    const filtered =
      !filter.query || clear
        ? data
        : data.filter((row) => {
            const columnValue = row[filter.headerIndex];
            if (
              columnValue &&
              columnValue
                .toString()
                .toLowerCase()
                .includes(filter.query.toLowerCase())
            ) {
              return true;
            }
            return false;
          });

    setFilteredData(filtered);
    setPagination({
      ...pagination,
      currentPage: 0,
      total: filtered.length,
    });
  };

  const renderItem = ({ item: d }: any) => {
    return (
      <DataTable.Row
        key={d.id}
        style={styles.tableRow}
        onPress={() => {
          router.push({
            pathname: "/details",
            params: d,
          });
        }}
      >
        {headers.map((h) => {
          return (
            <DataTable.Cell
              style={{
                width: h.width,
              }}
              key={h.key}
            >
              {d[h.key].replace('"', "")}
            </DataTable.Cell>
          );
        })}
      </DataTable.Row>
    );
  };

  const getPaginationRange = () => {
    const start = pagination.currentPage * pagination.pageSize + 1;
    let end = (pagination.currentPage + 1) * pagination.pageSize;

    if (end > pagination.total) {
      end = pagination.total;
    }
    return { start, end };
  };

  const { start, end } = getPaginationRange();
  const paginationLabel = `${start}-${end} of ${pagination.total}`;

  const renderDropdownItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.title}</Text>
        {item.title === filter.headerIndex && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <View>
      <View style={styles.filterContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={(text) => setFilter({ ...filter, query: text })}
          value={filter.query}
          onClearIconPress={() => {
            onFilter(true);
          }}
          style={styles.searchInput}
        />
        <View style={styles.filterFooter}>
          <Text style={{ color: "gray" }}>Filter By</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={headers}
            maxHeight={300}
            labelField="title"
            valueField="key"
            placeholder="Select filter"
            value={filter.headerIndex}
            onChange={(item) => {
              setFilter({ ...filter, headerIndex: item.key });
            }}
            renderItem={renderDropdownItem}
          />
          <Pressable style={styles.button} onPress={() => onFilter()}>
            <AntDesign name="search1" size={20} />
          </Pressable>
        </View>
      </View>

      <ScrollView horizontal contentContainerStyle={{ paddingLeft: 20 }}>
        <DataTable>
          <DataTable.Header style={styles.tableHeader}>
            {headers.map((h) => {
              return (
                <DataTable.Title
                  key={h.title}
                  style={{
                    width: h.width,
                  }}
                >
                  {h.title}
                </DataTable.Title>
              );
            })}
          </DataTable.Header>
          <FlatList
            data={filteredData.slice(start - 1, end)}
            renderItem={renderItem}
          />
        </DataTable>
      </ScrollView>

      {pagination.total > pagination.pageSize && (
        <DataTable.Pagination
          page={pagination.currentPage}
          numberOfPages={Math.ceil(pagination.total / pagination.pageSize)}
          onPageChange={(currentPage) =>
            setPagination({ ...pagination, currentPage })
          }
          label={paginationLabel}
          numberOfItemsPerPage={pagination.pageSize}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
          style={{
            alignSelf: "center",
            padding: 10,
          }}
        />
      )}
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  tableHeader: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  tableHeaderTitle: {
    width: 200,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
  },
  head: { height: 40, backgroundColor: "white" },
  text: { margin: 6 },
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  filterFooter: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 0,
  },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#DCDCDC",
  },
  dropdown: {
    flex: 1,
    margin: 16,
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    borderWidth: 0.5,
    borderColor: "#DCDCDC",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 14,
    borderWidth: 0.5,
    borderColor: "#DCDCDC",
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {},
});

export default CustomDataTable;
