import "../App.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  updateTransaction,
} from "../redux/ducks/TransactionReducer";
import { useState, useEffect, React } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  monthYearList,
  fromAccountList,
  toAccountList,
  transactionTypeList,
} from "../utils/constant";

function AddTransaction() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.transactions.value);
  console.log(users, "users");

  const initialValues = {
    transactionDate: "",
    monthYear: "",
    transactionType: "",
    fromAccount: "",
    toAccount: "",
    amount: "",
    receipt: "",
    notes: "",
  };

  const [formData, setFormData] = useState(initialValues);
  const [imagePreview, setImagePreview] = useState(null);

  const schema = yup.object().shape({
    transactionDate: yup.string().required("transactionDate is required"),
    monthYear: yup.string().required("Please select a monthYear"),
    transactionType: yup.string().required("Transaction type is required"),
    fromAccount: yup
      .string()
      .required("from account is required")
      .notOneOf([yup.ref("toAccount")], "Both Values must be different"),
    toAccount: yup
      .string()
      .required("to account is required")
      .notOneOf(
        [yup.ref("fromAccount"), null],
        "Both Values must be different"
      ),

    amount: yup
      .string()
      .required("amount is required")
      .test("number", "number must be greater than 1", (value) => {
        if (!value) return true; // Don't validate if no file selected
        return value && value >= 1; // 1 MB
      }),
    notes: yup.string().required("notes is required"),
    receipt: yup
      .mixed()
      .required("select file")
      // .test("required", "please select file", (value) => {
      //   return value && value.length > 0;
      // })
      .test("fileSize", "File size is too large", (value) => {
        if (value && value[0] && value[0].size <= 1048576) return true; // Allow empty values
        // return value.size <= 1048576;

        if (typeof value === "string" && value.startsWith("data:image")) {
          return true;
        }
        return false;
      })
      .test(
        "fileType",
        "Only JPEG, PNG, and GIF files are allowed",
        (value) => {
          if (
            value &&
            value[0] &&
            ["image/jpeg", "image/png", "image/gif"].includes(value[0].type)
          ) {
            return true;
          }
          if (typeof value === "string" && value.startsWith("data:image")) {
            return true;
          }
          return false;
        }
      ),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onabort = (formError) => reject(formError);
      reader.readAsDataURL(file);
    });
  };

  function previewFile(e) {
    const reader = new FileReader();

    const selectedFile = e.target.files[0];
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
    // As the File loaded then set the stage as per the file type
    reader.onload = (readerEvent) => {
      if (selectedFile.type.includes("image")) {
        setImagePreview(readerEvent.target.result);
      }
    };
  }
  function clearFiles() {
    setImagePreview(null);
    const img = { ...formData, receipt: null };
    setFormData(img);
  }

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(e.target, "heyy");
    setFormData((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));
  };

  //prefilled value
  useEffect(() => {
    // setFormData(users);
    Object.entries(formData).forEach(([key, value]) => {
      setValue(key, value);
    });
    setImagePreview(formData.receipt);
  }, [formData, setValue]);

  const navigate = useNavigate();

  console.log(formData.transactionDate, "formdddddddddd");

  const { id } = useParams();
  console.log({ id }, "param");

  const onSubmit = async (e) => {
    const isImg64 = typeof e.receipt === "string";

    if (!isImg64) {
      const img = await getBase64(e.receipt[0]);
      console.log(img, "imggggg");
      e.receipt = img;
    }

    const value = { ...e };

    console.log(value, "eeeee");
    const data = {
      ...formData,
      transactionDate: value.transactionDate,
      monthYear: value.monthYear,
      transactionType: value.transactionType,
      fromAccount: value.fromAccount,
      toAccount: value.toAccount,
      amount: value.amount,
      receipt: value.receipt,
      notes: value.notes,
    };
    //setFormData(data);
    console.log(data, "datuuuu");

    console.log("hello");
    if (users) {
      console.log("in usersss");
      const retrivedata = users;
      console.log("id...", id);
      if (id) {
        console.log("in update");

        const dispatchData = dispatch(updateTransaction({ id: data.id, data }));

        //setFormData(data);
        console.log(formData, "formdataaa");
        console.log(dispatchData, "dispatchData");
        console.log(id, "dataaaaaid");
        alert("update successfully");
      } else {
        console.log("in insert");
        const previd = retrivedata[retrivedata.length - 1].id;
        console.log(previd, "previd");
        data["id"] = parseInt(previd) + 1;
        console.log(data["id"], "newid");

        console.log(data, "rsssss");
        dispatch(addTransaction(data));
        setFormData(data);
        console.log(retrivedata, "data");
        alert("insert successfully");
      }
    } else {
      data["id"] = 1;
      dispatch(addTransaction([data]));
    }
    navigate("/ViewData");
    console.log("transactionnn", dispatch(addTransaction));
  };

  const retrivedata = users;

  useEffect(() => {
    for (const e in retrivedata) {
      if (parseInt(retrivedata[e].id) === parseInt(id)) {
        setFormData(retrivedata[e]);
        console.log(retrivedata[e], "retrieesfsd");
        break;
      }
    }
    //setFormData(users);
  }, []);
  return (
    <>
      <ul>
        <Link to="/ViewData" className="add-btn">
          ViewData
        </Link>
      </ul>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="section">
          <div className="row">
            <div className="container">
              <div className="heading">
                <h3>Validation Form</h3>
              </div>

              <label htmlFor="date">Transaction Date</label>
              <input
                type="date"
                className="input"
                name="transactionDate"
                {...register("transactionDate")}
              />

              <span className="span1">{errors.transactionDate?.message}</span>

              <label>Month Year</label>

              <select
                name="monthYear"
                className="input"
                {...register("monthYear")}
              >
                <option value="" disabled>
                  Select Month Year
                </option>

                {monthYearList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="span1">{errors.monthYear?.message}</span>

              <label>Transaction Type</label>
              <select
                name="transactionType"
                className="input"
                {...register("transactionType")}
              >
                <option value="" disabled>
                  Select transactionType
                </option>

                {transactionTypeList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <span className="span1">{errors.transactionType?.message}</span>

              <label>From Account</label>
              <select
                className="input"
                name="fromAccount"
                {...register("fromAccount")}
              >
                <option value="" disabled>
                  Select From Account
                </option>

                {fromAccountList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <span className="span1">{errors.fromAccount?.message}</span>

              <label>To Account</label>

              <select
                name="toAccount"
                className="input"
                defaultValue={initialValues.toAccount}
                onChange={onChangeHandler}
                {...register("toAccount")}
              >
                <option value="" disabled>
                  Select To Account
                </option>

                {toAccountList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <span className="span1">{errors.toAccount?.message}</span>

              <label htmlFor="amount">Amount </label>
              <input
                type="number"
                className="input"
                name="amount"
                {...register("amount")}
              />
              <span className="span1">{errors.amount?.message}</span>

              <label htmlFor="receipt">Receipt </label>

              <div>
                {/* {imagePreview  ? ( */}
                <>
                  {imagePreview != null && (
                    <img src={imagePreview} height={60} width={50} alt="" />
                  )}
                  <input
                    type="button"
                    className="btn"
                    value="X"
                    onClick={clearFiles}
                  />
                </>
                {/* ) : ( */}
                <input
                  accept="image/jpg, image/png, image/jpeg"
                  type="file"
                  className="input"
                  name="receipt"
                  {...register("receipt")}
                  onChange={previewFile}
                />
                {/* )} */}

                <span className="span1">{errors.receipt?.message}</span>
              </div>

              <label htmlFor="notes">Notes </label>
              <textarea
                className="input"
                name="notes"
                maxLength="250"
                {...register("notes")}
              />
              <span className="span1">{errors.notes?.message}</span>

              <div className="bottom">
                <input className="input" type="submit" value="submit" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddTransaction;
