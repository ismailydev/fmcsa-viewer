import CustomDataTable from "@/components/DataTable";
import Loader from "@/components/Loader";
import { readFile } from "@/utils/readFile";
import { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = () => {
    setLoading(true);
    readFile().then((res) => {
      if (res) {
        setData(res);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {data.length > 0 && <CustomDataTable data={data} />}
    </SafeAreaView>
  );
}
