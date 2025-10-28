import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebaseConfig";

export default function CompareProductsTable({ productType }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const collectionName =
          productType.toLowerCase() === "las"
            ? "LAS"
            : productType.toLowerCase() === "lamf"
            ? "LAMF"
            : "MTF";

        const querySnapshot = await getDocs(collection(db, collectionName));

        const firebaseData = querySnapshot.docs.map((doc) => {
          const d = doc.data();

          return {
            id: doc.id,
            name:
              d["Financial Institution"] ||
              d["Institution Name"] ||
              d["Name"] ||
              "—",
            approvedStocks:
              d["Approved List of Shares"] ||
              d["Approved Stocks"] ||
              d["Approved List of MF"] ||
              "—",
            interestMin:
              d["Interest Rate"]?.Min ||
              d["Interest Rate"]?.min ||
              d["Interest Rate Min"] ||
              "—",
            interestMax:
              d["Interest Rate"]?.Max ||
              d["Interest Rate"]?.max ||
              d["Interest Rate Max"] ||
              "—",
          };
        });

        const filtered = firebaseData.filter((item) =>
          ["Bajaj", "SBI", "Axis Bank"].some((key) =>
            item.name?.toLowerCase()?.includes(key.toLowerCase())
          )
        );

        setData(filtered);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productType]);

  if (loading) {
    return (
      <div className="p-6 text-center text-slate-200 bg-white/10 rounded-2xl">
        Loading data...
      </div>
    );
  }

  return (
    <div className="bg-white/20 rounded-2xl border border-white/20 backdrop-blur-md shadow-lg p-6 overflow-x-auto">
      <h3 className="text-xl font-bold mb-4 text-black text-center">
        {productType.toUpperCase()} Comparison
      </h3>
      <table className="w-full border-collapse text-slate-800 text-sm sm:text-base">
        <thead>
          <tr className="bg-white/10">
            <th className="px-4 py-3 border-b text-left">Institution</th>
            <th className="px-4 py-3 border-b text-left">Approved Stocks</th>
            <th className="px-4 py-3 border-b text-center">Interest Rate Min</th>
            <th className="px-4 py-3 border-b text-center">Interest Rate Max</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-orange-100 hover:shadow-lg transition-colors duration-200"
            >
              <td className="px-4 py-3 border-b">{row.name}</td>
              <td className="px-4 py-3 border-b">{row.approvedStocks}</td>
              <td className="px-4 py-3 border-b text-center text-teal-400 font-semibold">
                {row.interestMin}
              </td>
              <td className="px-4 py-3 border-b text-center text-pink-400 font-semibold">
                {row.interestMax}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
