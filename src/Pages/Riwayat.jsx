import React from "react";
import NavBar from "../Component/UiComponent/NavBar";
import Card from "../Component/UiComponent/Card";
import Text from "../Component/UiComponent/Text/TextColor";
import TableHead from "../Component/UiComponent/Table/TableHead";
import TableBody from "../Component/UiComponent/Table/TableBody";
import Status from "../Component/UiComponent/Text/Status";
import { useEffect } from "react";
import { getAllMailing } from "../Fetch/Fetch";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function Riwayat() {
  const [mailings, setMailings] = useState();
  const [mailingsLength, setMailingsLength] = useState();
  const [page, setPage] = useState(1);

  // pagination
  const previousPage = () => {
    console.log("previous");
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const nextPage = () => {
    console.log("ini length", mailingsLength);
    if (page < mailingsLength) {
      setPage(page + 1);
    }
    console.log("next");
  };

  console.log("ini pagenya = ", page);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllMailing(page, 5);
        setMailings(res.data.result);
        setMailingsLength(res.data.totalPages);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [page]);

  console.log(mailings);
  console.log(mailingsLength);

  let token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />;
  }
  return (
    <NavBar pageName="Riwayat" to="/persuratan">
      <Card className="space-y-9">
        <Text
          item="Riwayat Persuratan"
          color="headerB"
          className="text-[#333333]"
        />
        <div className="overflow-x-auto relative sm:rounded-lg border-[1.5px] border-[#E6E6E6]">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="bg-[#F7F7F7] text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="h-[3rem] text-xs">
                <TableHead className="w-[1%] pl-10 text-left" item="No." />
                <TableHead className="w-[3%] pl-10 text-left" item="Tanggal" />
                <TableHead
                  className="w-[8%] pl-10 text-left"
                  item="No. Surat"
                />
                <TableHead className="w-[9%] pl-10 text-left" item="Tujuan" />
                <TableHead className="w-[4%] pl-10 text-left" item="Status" />
                <TableHead className="w-[3%] pl-10 text-left" item="Action" />
              </tr>
            </thead>
            <tbody>
              {mailings?.map((data, key) => {
                const formattedDate = new Date(
                  data.updatedAt
                ).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                });
                return (
                  <tr
                    className="mt-3 h-20 px-10 text-xs text-[#7E8299] border-b-[1px]"
                    key={key}
                  >
                    <TableBody item={key + 1} className="text-center" />
                    <TableBody item={formattedDate} />
                    <TableBody item={data.no_surat} />
                    <TableBody item={data.tujuan} />
                    <TableBody>
                      <Link to="/print" state={{ id: data.id }}>
                        <Status item="printed" />
                      </Link>
                    </TableBody>
                    <TableBody>
                      <Link to="/edit" state={data.id}>
                        <p
                          target="_blank"
                          href="/cover letter.pdf"
                          className="text-[#1975FF]"
                        >
                          Lihat
                        </p>
                      </Link>
                    </TableBody>
                  </tr>
                );
              })}
            </tbody>
            <tbody className="p-5">
              <tr className="mt-3 h-[4rem] text-xs text-[#7E8299] border-b-[1px]">
                <td colSpan="6" className="text-center px-10">
                  <div className="flex justify-around">
                    <div className="flex space-x-2">
                      <div
                        className="bg-[#1975FF] rounded-[.3rem] w-[2rem] flex item-center justify-center py-2"
                        onClick={previousPage}
                      >
                        <MdKeyboardArrowLeft className="text-[1rem] text-white" />
                      </div>
                      <div className="flex space-x-2 tex-[1.2rem] items-center justify-center">
                        {Array.from(Array(mailingsLength).keys()).map(
                          (index) => (
                            <p
                              key={index + 1}
                              className={`${
                                index <= 2 || page === index + 1 ? "" : "hidden"
                              } ${
                                page === index + 1 &&
                                "bg-[#1975FF] text-white rounded-full w-[1.4rem] h-[1.4rem] flex items-center justify-center"
                              }`}
                            >
                              {index + 1 <= 2 || page === index + 1
                                ? index + 1
                                : "..."}
                            </p>
                          )
                        )}
                        <div>
                          <p
                            className={`${
                              mailingsLength === page || mailingsLength <= 2
                                ? "hidden"
                                : ""
                            }`}
                          >
                            {mailingsLength}
                          </p>
                        </div>
                      </div>
                      <div
                        className="bg-[#1975FF] rounded-[.3rem]  w-[2rem] flex item-center justify-center py-2"
                        onClick={nextPage}
                      >
                        <MdKeyboardArrowRight className="text-[1rem] text-white" />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </NavBar>
  );
}
