import React from "react";
import NavBar from "../Component/UiComponent/NavBar";
import Card from "../Component/UiComponent/Card";
import Text from "../Component/UiComponent/Text/TextColor";
import Drop from "../Component/UiComponent/Inputs/Drop";
import Inputs from "../Component/UiComponent/Inputs/Inputs";
import TextArea from "../Component/UiComponent/Inputs/textArea";
import ButtonAdd from "../Component/UiComponent/Buttons/ButtonAdd";
import ButtonUpload from "../Component/UiComponent/Inputs/Upload";
import ButtonUpload2 from "../Component/UiComponent/Inputs/Upload2";
import ButtonP from "../Component/UiComponent/Buttons/ButtonP";
import ButtonDate from "../Component/UiComponent/Buttons/ButtonDate";
import ButtonDrag from "../Component/UiComponent/Buttons/ButtonDrag";
import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import ButtonInput from "../Component/UiComponent/Buttons/ButtonInput";
import {
  getPost,
  createPost,
  createMailing,
  getTujuan,
  getOneMailing,
} from "../Fetch/Fetch";
import { useEffect } from "react";
import { list } from "postcss";
import RequiredModal from "../Component/UiComponent/Modal/RequiredModal";
import DataSaved from "../Component/UiComponent/Modal/DataSaved";

export default function Persuratan() {
  const [active, setActive] = useState(false);
  const [detail, setDetail] = useState([]);
  const [tujuan, setTujuan] = useState();
  const [data, setData] = useState([]);
  const [dataResult, setDataResult] = useState([]);
  const [dataDetail, setDataDetail] = useState([]);
  const [empty, setEmpty] = useState([]);
  const [isSave, setIsSave] = useState(false);
  const [item, setItem] = useState({
    tujuan: "",
    no_surat: "",
    nama_pihak_satu: "",
    jabatan_pihak_satu: "",
    alamat_pihak_satu: "",
    nama_pihak_dua: "",
    ktp_pihak_dua: "",
    tempat_lahir_pihak_dua: "",
    tanggal_lahir_pihak_dua: "",
    alamat_pihak_dua: "",
    tugas_pihak_dua: "",
    job_detail: "",
    job_result: "",
    start_date: "",
    end_date: "",
    pembayaran: "",
    ttd_pihak_satu: [],
    ttd_puhak_dua: [],
    nama_bank: "",
    nama_rekening: "",
    no_rekening: "",
    pembayaran_pertama: "",
    pembayaran_kedua: "",
  });
  const [addTujuan, setAddTujuan] = useState({ tujuan_name: "" });
  const [rincian, setRincian] = useState(false);
  const [hasil, setHasil] = useState(false);
  const [checkDefault, setCheckDefault] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPrint, setIsPrint] = useState(false);
  const [dataMiling, setDataMailing] = useState([]);

  // date
  const dateChangeHandler = (date, name) => {
    const nameDate = name;
    setItem((prev) => {
      return { ...prev, [nameDate]: date };
    });
    if (date.length !== "") {
      setActive(true);
    }
  };

  // daftar hasil
  const handleAddHasil = () => {
    setHasil(true);
  };

  const handleDeleteHasil = () => {
    setHasil(false);
  };

  // bentuk hasil pekerjaan
  const handleAddRincian = () => {
    setRincian(true);
  };

  const handleDeleteRincian = () => {
    setRincian(false);
  };

  // handle semua inputan
  const handle = async (e) => {
    const { name, value } = await e.target;
    setItem((prev) => {
      return { ...prev, [name]: value };
    });
    if (value.length !== "") {
      setActive(true);
    }
  };

  const handleDefaultInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (checkDefault === false) {
      setItem((prev) => {
        return { ...prev, [name]: value };
      });
      if (value.length !== "") {
        setActive(true);
      }
    }
  };

  // insert data to array
  const addDetail = async (e) => {
    setDataDetail((prevDataDetail) => [...prevDataDetail, detail]);

    setItem((prevItem) => {
      return { ...prevItem, job_detail: [...dataDetail, detail] };
    });
  };

  const addResult = () => {
    setDataResult((prevDataResult) => [...prevDataResult, detail]);

    setItem((prevItem) => {
      return { ...prevItem, job_result: [...dataResult, detail] };
    });
  };

  const callback = (value) => {
    setDetail(value);
    if (value.length !== "") {
      setActive(true);
    }
  };

  const handleTujuan = async (value) => {
    const dataTujuan = await value;
    setItem((prev) => {
      return { ...prev, tujuan: dataTujuan };
    });
    if (value.length !== "") {
      setActive(true);
    }
  };

  // file
  const fileCallback = async (name, e) => {
    const nameFile = await name;
    const file = await e;
    setItem((prev) => {
      return { ...prev, [nameFile]: file };
    });
    setActive(true);
  };

  // tujuan
  const tujuanCallback = async (name) => {
    const tujuan = await getTujuan();
    if (name) {
      setData(tujuan.data);
    }
  };

  // push to api
  const save = async () => {
    let isEmpty = false;
    Object.entries(item).forEach(([key, value]) => {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        setEmpty((prevState) =>
          prevState.includes(key) ? prevState : [...prevState, key]
        );
        isEmpty = false;
      } else {
        setEmpty((prevState) => prevState.filter((itemKey) => itemKey !== key));
        isEmpty = true;
      }
    });
    if (empty.length === 0 && active && isEmpty) {
      const res = await createMailing(item);
      console.log(res);
      setIsOpen(false);
      setIsSave(true);
    } else {
      setIsOpen(true);
    }
  };

  // set Default
  const handleDefault = (e) => {
    if (e.target.checked) {
      setItem((prev) => {
        return {
          ...prev,
          nama_pihak_satu: "Ahmad Irfandi S.T",
          jabatan_pihak_satu: "Direktur PT. Upana Pelopor Aplikasi Adikarya",
          alamat_pihak_satu: "BTN Pao Pao Indah Blok A1 No. 01",
        };
      });
      setCheckDefault(true);
    } else {
      setCheckDefault(false);
    }
  };

  const print = async () => {
    let isEmpty = false;
    Object.entries(item).forEach(([key, value]) => {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        setEmpty((prevState) =>
          prevState.includes(key) ? prevState : [...prevState, key]
        );
        isEmpty = false;
      } else {
        setEmpty((prevState) => prevState.filter((itemKey) => itemKey !== key));
        isEmpty = true;
      }
    });
    if (empty.length === 0 && active && isEmpty) {
      setIsOpen(false);
      setIsPrint(true);
    } else {
      setIsPrint(false);
      setIsOpen(true);
    }
  };

  const fetchData = async () => {
    try {
      const res = await getTujuan();
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    if (isSave) {
      const timeOut = setTimeout(() => {
        setIsSave(false);
      }, 3000);

      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [isSave]);

  console.log(empty);
  console.log(item);

  let token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <DataSaved info="Data Berhasil Ditambahkan" isActive={isSave} />
      <NavBar pageName="Persuratan" to="/riwayat">
        <Card>
          <div className="container flex flex-col space-y-4">
            <div className="flex space-x-10">
              <div className="w-[3rem]">
                <Text
                  item="Tujuan"
                  color="primary"
                  className="align-middle mt-[4px]"
                />
              </div>
              <Drop
                tujuanCallback={tujuanCallback}
                type={`${empty.includes("tujuan") ? "error" : "primary"}`}
                onChange={handle}
                callback={handleTujuan}
                name="tujuan"
                item="Surat perjanian Kerja lepas"
                drop={data.map((item, index) => ({
                  name: item.tujuan_name,
                  key: index,
                }))}
              />
            </div>
            <div className="flex space-x-10">
              <div className="w-[2.7rem]">
                <Text
                  item="No.Surat"
                  color="primary"
                  className="align-middle mt-[4px]"
                />
              </div>
              <Inputs
                onChange={handle}
                name="no_surat"
                itype={`${empty.includes("no_surat") ? "error" : "primary"}`}
                Ticon="hidden"
                className="w-full"
              />
            </div>
          </div>
          <hr className="w-full border-[.5px] border-[#3F4254]/10 mt-8" />

          {/* section 2 */}
          <div className="container-section-two mt-9 flex flex-col space-y-4">
            <Text item="Pihak Pertama" color="header" />
            <div className="flex sm:grid-cols-2 w-full space-x-12">
              <div className="w-full relative flex flex-col space-y-1.5">
                <Text item="Nama" color="primary" star="on" />

                <Inputs
                  itype={`${
                    empty.includes("nama_pihak_satu") ? "error" : "primary"
                  }`}
                  Ticon="hidden"
                  onChange={handleDefaultInput}
                  name="nama_pihak_satu"
                  className={`${checkDefault ? "hidden" : "show"}`}
                />
                <Inputs
                  readonly
                  itype={`${
                    empty.includes("nama_pihak_satu") ? "error" : "primary"
                  }`}
                  Ticon="hidden"
                  onChange={handleDefaultInput}
                  name="nama_pihak_satu"
                  className={`${
                    !checkDefault ? "hidden" : "show"
                  } text-[#B2B2B2]`}
                  value="Ahmad Irfandi S.T"
                />
              </div>
              <div className="w-full relative flex flex-col space-y-1.5">
                <Text item="Jabatan" color="primary" star="on" />
                <Inputs
                  itype={`${
                    empty.includes("jabatan_pihak_satu") ? "error" : "primary"
                  }`}
                  Ticon="hidden"
                  onChange={handleDefaultInput}
                  name="jabatan_pihak_satu"
                  className={`${checkDefault ? "hidden" : "show"}`}
                />
                <Inputs
                  itype={`${
                    empty.includes("jabatan_pihak_satu") ? "error" : "primary"
                  }`}
                  Ticon="hidden"
                  onChange={handleDefaultInput}
                  name="jabatan_pihak_satu"
                  className={`${
                    !checkDefault ? "hidden" : "show"
                  } text-[#B2B2B2]`}
                  value="Direktur PT. Upana Pelopor Aplikasi Adikarya"
                  readonly
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Text item="Alamat" color="primary" star="on" />
              <Inputs
                itype={`${
                  empty.includes("alamat_pihak_satu") ? "error" : "primary"
                }`}
                Ticon="hidden"
                onChange={handleDefaultInput}
                name="alamat_pihak_satu"
                className={`${checkDefault ? "hidden" : "show"}`}
              />
              <Inputs
                itype={`${
                  empty.includes("alamat_pihak_satu") ? "error" : "primary"
                }`}
                Ticon="hidden"
                onChange={handleDefaultInput}
                name="alamat_pihak_satu"
                className={`${
                  !checkDefault ? "hidden" : "show"
                } text-[#B2B2B2]`}
                value="BTN Pao Pao Indah Blok A1 No. 01"
                readonly
              />
            </div>
            <div className="flex">
              <input
                onChange={handleDefault}
                type="checkbox"
                className="h-4 w-4 border-1 rounded-[6px] mr-2 border-[#B2B2B2]"
              />
              <Text
                item="Gunakan data default"
                color="primary"
                className="px-0"
              />
            </div>
          </div>
          {/* section 3 */}
          <hr className="w-full border-[.5px] border-[#3F4254]/10 mt-8" />

          <div className="container-section-two mt-9 flex flex-col space-y-4">
            <Text item="Pihak Kedua" color="header" />
            <div className="flex sm:grid-cols-2 w-full space-x-12">
              <div className="w-full relative flex flex-col space-y-1.5">
                <Text item="Nama" color="primary" star="on" />
                <Inputs
                  itype={`${
                    empty.includes("nama_pihak_dua") ? "error" : "primary"
                  }`}
                  Ticon="hidden"
                  onChange={handle}
                  name="nama_pihak_dua"
                />
              </div>
              <div className="w-full relative flex flex-col space-y-1.5">
                <Text item="No. KTP" color="primary" star="on" />
                <Inputs
                  itype={`${
                    empty.includes("ktp_pihak_dua") ? "error" : "primary"
                  }`}
                  Ticon="hidden"
                  onChange={handle}
                  name="ktp_pihak_dua"
                />
              </div>
            </div>
            <div className="flex sm:grid-cols-2 w-full space-x-12">
              <div className="w-full relative flex flex-col space-y-1.5">
                <Text item="Tempat Lahir" color="primary" star="on" />
                <Inputs
                  itype={`${
                    empty.includes("tempat_lahir_pihak_dua")
                      ? "error"
                      : "primary"
                  }`}
                  Ticon="hidden"
                  onChange={handle}
                  name="tempat_lahir_pihak_dua"
                />
              </div>
              <div className="w-full relative flex flex-col space-y-1.5">
                <Text item="Tanggal Lahir" color="primary" star="on" />
                <ButtonDate
                  type={`${
                    empty.includes("tanggal_lahir_pihak_dua")
                      ? "error"
                      : "primary"
                  }`}
                  name="tanggal_lahir_pihak_dua"
                  onChange={dateChangeHandler}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Text item="Alamat" color="primary" star="on" />
              <TextArea
                onChange={handle}
                name="alamat_pihak_dua"
                type={`${
                  empty.includes("alamat_pihak_dua") ? "error" : "primary"
                }`}
              />
            </div>
          </div>

          {/* section 4 */}
          <hr className="w-full border-[.5px] border-[#3F4254]/10 mt-8" />

          <div className="container-section-two mt-9 flex flex-col space-y-4">
            <Text item="Perjanjian Kerja" color="header" />
            <div className="flex flex-col space-y-1.5">
              <Text
                item="Tugas dan pekerjaan Pihak Kedua"
                color="primary"
                star="on"
              />
              <Inputs
                itype={`${
                  empty.includes("tugas_pihak_dua") ? "error" : "primary"
                }`}
                Ticon="hidden"
                onChange={handle}
                name="tugas_pihak_dua"
              />
            </div>
            <div className="flex sm:grid-cols-2 w-full space-x-12">
              <div className="w-full relative flex flex-col space-y-1.5">
                <Text item="Rincian Pekerjaan" color="primary" star="on" />
                {dataDetail.map((item, key) => (
                  <ButtonDrag item={item} key={key} />
                ))}
                <ButtonInput
                  onKeyPress={(event) => {
                    event.key === "Enter" && addDetail();
                  }}
                  callback={callback}
                  name="handulillah"
                  item="ulala"
                  listi={handleDeleteRincian}
                  className={`${rincian === true ? "block" : "hidden"}`}
                />
                <ButtonAdd
                  item="Tambahkan Daftar Rincian"
                  onClick={handleAddRincian}
                />
              </div>
              <div className="w-full relative flex flex-col space-y-1.5">
                <Text
                  item="Penyerahan Hasil Pekerjaan"
                  color="primary"
                  star="on"
                />
                {dataResult.map((item) => (
                  <ButtonDrag item={item} />
                ))}
                <ButtonInput
                  onKeyPress={(event) => {
                    event.key === "Enter" && addResult();
                  }}
                  callback={callback}
                  item="ulala"
                  listi={handleDeleteHasil}
                  className={`${hasil === true ? "block" : "hidden"}`}
                />
                <ButtonAdd
                  item="Tambahkan Bentuk Hasil Pekerjaan"
                  onClick={handleAddHasil}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex sm:grid-cols-2 w-full space-x-12">
                <div className="w-full relative flex flex-col space-y-1.5">
                  <Text item="Jangka Waktu Kerja" color="primary" star="on" />
                  <ButtonDate
                    type={`${
                      empty.includes("start_date") ? "error" : "primary"
                    }`}
                    name="start_date"
                    onChange={dateChangeHandler}
                  />
                  <div className="flex">
                    <input
                      type="checkbox"
                      className="h-4 w-4 border-1 rounded-[6px] mr-2 my-2 border-[#B2B2B2]"
                    />
                    <Text
                      item="Gunakan data default"
                      color="primary"
                      className="px-0 py-2"
                    />
                  </div>
                </div>
                <div className="w-full relative flex flex-col space-y-1.5">
                  <Text
                    item="Tanggal"
                    color="primary"
                    className="text-[#FFFFFF]"
                  />
                  <ButtonDate
                    type={`${empty.includes("end_date") ? "error" : "primary"}`}
                    name="end_date"
                    onChange={dateChangeHandler}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Text item="Pembayaran" color="primary" star="on" />
                <Inputs
                  itype={`${
                    empty.includes("pembayaran") ? "error" : "primary"
                  }`}
                  Ticon="hidden"
                  onChange={handle}
                  name="pembayaran"
                />
              </div>

              {/* rincian pembelajaran */}
              <div className="flex flex-col space-y-1.5">
                <Text item="Rincian Pembayaran" color="primary" star="on" />
                <div className="flex sm:grid-cols-2 w-full space-x-12">
                  <div className="w-full relative flex flex-col space-y-1.5">
                    <Text item="Nama Bank" color="primary" star="on" />
                    <Inputs
                      itype={`${
                        empty.includes("nama_bank") ? "error" : "primary"
                      }`}
                      Ticon="hidden"
                      onChange={handle}
                      name="nama_bank"
                    />
                  </div>
                  <div className="w-full relative flex flex-col space-y-1.5">
                    <Text
                      item="Atas Nama pada Rekening"
                      color="primary"
                      star="on"
                    />
                    <Inputs
                      itype={`${
                        empty.includes("nama_rekening") ? "error" : "primary"
                      }`}
                      Ticon="hidden"
                      onChange={handle}
                      name="nama_rekening"
                    />
                  </div>
                </div>
                <div className="flex sm:grid-cols-2 w-full space-x-12">
                  <div className="w-[47.5%] relative flex flex-col space-y-1.5">
                    <Text item="No. Rekening" color="primary" star="on" />
                    <Inputs
                      itype={`${
                        empty.includes("no_rekening") ? "error" : "primary"
                      }`}
                      Ticon="hidden"
                      onChange={handle}
                      name="no_rekening"
                    />
                  </div>
                </div>
                <div className="flex sm:grid-cols-2 w-full space-x-12">
                  <div className="w-full relative flex flex-col space-y-1.5">
                    <Text item="Pembayaran Pertama" color="primary" star="on" />
                    <Inputs
                      itype={`${
                        empty.includes("pembayaran_pertama")
                          ? "error"
                          : "primary"
                      }`}
                      Ticon="hidden"
                      onChange={handle}
                      name="pembayaran_pertama"
                    />
                  </div>
                  <div className="w-full relative flex flex-col space-y-1.5">
                    <Text item="Pembayaran Kedua" color="primary" star="on" />
                    <Inputs
                      itype={`${
                        empty.includes("pembayaran_kedua") ? "error" : "primary"
                      }`}
                      Ticon="hidden"
                      onChange={handle}
                      name="pembayaran_kedua"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex sm:grid-cols-2 w-full space-x-12">
              <div className="w-full relative flex flex-col space-y-1.5">
                <Text
                  item="Tanda Tangan Pihak Pertama"
                  color="primary"
                  star="on"
                />
                <ButtonUpload
                  item="Tambahkan Daftar Rincian"
                  name="ttd_pihak_satu"
                  fileCallback={fileCallback}
                />
              </div>
              <div className="w-full relative flex flex-col space-y-1.5">
                <Text
                  item="Tanda Tangan Pihak Kedua"
                  color="primary"
                  star="on"
                />
                <ButtonUpload2
                  item="Tambahkan Bentuk Hasil Pekerjaan"
                  name="ttd_puhak_dua"
                  fileCallback={fileCallback}
                />
              </div>
            </div>
          </div>
          <hr className="w-full border-[.5px] border-[#3F4254]/10 mt-8" />

          {/* tombol simpan dan cetak */}
          <div className="py-5">
            <RequiredModal message="there are an empty field" isOpen={isOpen} />
            <div className="grid justify-items-end">
              <div className="flex space-x-3">
                <ButtonP
                  item="Simpan Sebagai Draft"
                  onClick={save}
                  className={`${
                    active === true
                      ? "text-[#333333] hover:bg-[#F1F1F1]"
                      : "bg-[#F1F1F1] text-[#B2B2B2]"
                  }`}
                  icon="simpan"
                />
                <Link
                  to={`${active && isPrint ? "/print-mailing" : "/persuratan"}`}
                  state={{ data: item }}
                >
                  <ButtonP
                    item="Cetak"
                    onClick={print}
                    className={`${
                      active === true
                        ? "bg-[#1975FF] text-[#FFFFFF] hover:bg-[#1561D5]"
                        : "bg-[#F1F1F1] text-[#B2B2B2]"
                    }`}
                  />
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </NavBar>
    </div>
  );
}
