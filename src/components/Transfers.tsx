import { useEffect, useState } from "react";
import { Transfer } from "@putdotio/api-client";
import TimeAgo from "react-timeago";

import ApiService from "../services/Api";
import { customTimeFormatter, truncate } from "../helpers";

const statusMap = {
  COMPLETED: "Completed",
  COMPLETING: "Completing",
  DOWNLOADING: "Downloading",
  ERROR: "Error",
  IN_QUEUE: "In Queue",
  PREPARING_DOWNLOAD: "Preparing Download",
  SEEDING: "Finished & Seeding",
  STOPPING: "Stopping",
  WAITING: "Waiting",
  WAITING_FOR_COMPLETE_QUEUE: "Waiting for Complete Queue",
  WAITING_FOR_DOWNLOAD: "Waiting for Download",
};

const statusColourMap = {
  COMPLETED: "text-green-600",
  COMPLETING: "text-blue-500",
  DOWNLOADING: "text-blue-500",
  ERROR: "text-red-500",
  IN_QUEUE: "text-amber-500",
  PREPARING_DOWNLOAD: "text-blue-500",
  SEEDING: "text-green-600",
  STOPPING: "text-amber-500",
  WAITING: "text-blue-500",
  WAITING_FOR_COMPLETE_QUEUE: "text-blue-500",
  WAITING_FOR_DOWNLOAD: "text-blue-500",
};

function Transfers({ api }: { api: ApiService }) {
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const transfers = await api.getTransfers();

      transfers.sort((a, b) => {
        if (a.status === "COMPLETED" && b.status !== "COMPLETED") {
          return 1;
        }
        if (a.status !== "COMPLETED" && b.status === "COMPLETED") {
          return -1;
        }
        return (
          new Date(b.finished_at!).getTime() -
          new Date(a.finished_at!).getTime()
        );
      });

      setTransfers(transfers);
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [api]);

  if (transfers.length === 0) {
    return (
      <div className="my-8 text-gray-500 text-center">
        No transfers whatsoever!
      </div>
    );
  }

  return (
    <div className="relative overflow-auto" style={{ maxHeight: "425px" }}>
      <table className="w-full text-left rtl:text-right">
        <tbody>
          {transfers.map((transfer) => {
            return (
              <tr
                key={transfer.id}
                className="bg-white border-b hover:bg-gray-200"
              >
                <td className="px-6 py-3 flex space-x-5 content-center items-center">
                  <div>
                    <span
                      className={`text-2xl ${statusColourMap[transfer.status as keyof typeof statusColourMap]}`}
                    >
                      ●
                    </span>
                  </div>
                  <div>
                    <div className="text-base">{truncate(transfer.name)}</div>
                    <div className="text-xs text-gray-500">
                      {statusMap[transfer.status as keyof typeof statusMap]} (
                      {["COMPLETED", "SEEDING"].includes(transfer.status) ? (
                        <TimeAgo
                          date={transfer.finished_at!}
                          formatter={customTimeFormatter}
                        />
                      ) : (
                        `${transfer.percent_done}%`
                      )}
                      )
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Transfers;