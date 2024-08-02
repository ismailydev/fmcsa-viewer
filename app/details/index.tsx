import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

interface DetailData {
  created_dt: string;
  credit_score: string;
  data_source_modified_dt: string;
  dba_name: string;
  drivers: string;
  duns_number: string;
  entity_type: string;
  id: string;
  legal_name: string;
  m_city: string;
  m_state: string;
  m_street: string;
  m_zip_code: string;
  mailing_address: string;
  mc_mx_ff_number: string;
  mcs_150_form_date: string;
  mcs_150_mileage_year: string;
  operating_status: string;
  out_of_service_date: string;
  p_city: string;
  p_state: string;
  p_street: string;
  p_zip_code: string;
  phone: string;
  physical_address: string;
  power_units: string;
  record_status: string;
  state_carrier_id_number: string;
  usdot_number: string;
}

export default function Details() {
  // @ts-ignore
  const params: DetailData = useLocalSearchParams();

  const {
    entity_type,
    record_status,
    usdot_number,
    mcs_150_form_date,
    out_of_service_date,
    state_carrier_id_number,
    mcs_150_mileage_year,
    //
    operating_status,
    mc_mx_ff_number,
    //
    legal_name,
    dba_name,
    physical_address,
    phone,
    mailing_address,
    duns_number,
    power_units,
    drivers,
  } = params;

  const renderDetail = (title: string, value: string) => {
    return (
      <View style={{ flexDirection: "row", gap: 20, marginVertical: 2 }}>
        <Text
          style={{
            flex: 1,
            textAlign: "right",
            fontWeight: "semibold",
            color: "grey",
          }}
        >
          {title}
        </Text>
        <Text style={{ flex: 1 }}>
          {value ? value.replaceAll('"', "") : "-"}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={{ padding: 20 }} showsVerticalScrollIndicator={false}>
      <Stack.Screen
        options={{
          title: "Detail Information",
          headerShadowVisible: false,
          headerBackTitle: "Back",
        }}
      />
      <View>
        <Text style={styles.title}>USDOT Information</Text>
        <View>
          {renderDetail("Entity Type", entity_type)}
          <View style={{ gap: 2 }}>
            {renderDetail("USDOT Status", record_status)}
            {renderDetail("USDOT Number", usdot_number)}
            {renderDetail("MCS-150 Form Date", mcs_150_form_date)}
            {renderDetail("Out of service date", out_of_service_date)}
            {renderDetail("State Carrier ID Number", state_carrier_id_number)}
            {renderDetail("MCS-150 Mileage Year", mcs_150_mileage_year)}
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.title}>Operating Authority Information</Text>
        <View style={{ gap: 2 }}>
          {renderDetail("Operating Authority Status", operating_status)}
          {renderDetail("MC/MX/FF Number(s)", mc_mx_ff_number)}
        </View>
      </View>
      <View>
        <Text style={styles.title}>Company Information</Text>
        <View style={{ gap: 2 }}>
          {renderDetail("Legal Name", legal_name)}
          {renderDetail("DBA Name", dba_name)}
          {renderDetail("Physical Address", physical_address)}
          {renderDetail("Phone", phone)}
          {renderDetail("Mailing Address", mailing_address)}
          {renderDetail("DUNS Number", duns_number)}
          {renderDetail("Power Units", power_units)}
          {renderDetail("Driver", drivers)}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "semibold",
    paddingVertical: 20,
  },
});
