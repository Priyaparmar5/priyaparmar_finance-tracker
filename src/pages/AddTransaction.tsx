import "../App.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  updateTransaction,
} from "../redux/ducks/TransactionReducer";
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  monthYearList,
  fromAccountList,
  toAccountList,
  transactionTypeList,
  staticValues,
} from "../utils/constant";
import { RootState } from "../redux/store";
import { initialValue } from "../utils/Transaction";

const AddTransaction: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(
    (state: RootState) => state.transactions.transaction
  );
  console.log(users, "users");

  interface tFormInputs {
    id: number;
    transactionDate: string;
    monthYear: string;
    transactionType: string;
    fromAccount: string;
    toAccount: string;
    amount: number;
    receipt: string;
    notes: string;
  }
  const initialValues = {
    // id:"",
    transactionDate: "",
    monthYear: "",
    transactionType: "",
    fromAccount: "",
    toAccount: "",
    amount: "",
    receipt: "",
    notes: "",
  };

  const [formData, setFormData] = useState<any>(initialValues);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const schema = yup.object().shape({
    transactionDate: yup.string().required("transactionDate is required"),
    monthYear: yup.string().required("month year is required"),
    //  monthYear : yup.string().required("monthYear is required"),
    //   monthYear:yup.array().required("Please select an hobby"),
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
        if (!value) return true; // Don't validate if no value provided
        const numberValue = Number(value);
        return !isNaN(numberValue) && numberValue >= 1;
      }),
    notes: yup
      .string()
      .required("notes is required")
      .test("len", "Max 250 characters", (val) => val.toString().length <= 250),
    receipt: yup.mixed().required("select file"),
    // .test("required", "please select file", (value) => {
    //   return value && value.length > 0;
    // })
    // .test("fileSize", "File size must be less than or equal to 1MB", (value) => {
    //   if (!value || (Array.isArray(value) && value.length === 0)) {
    //     return true; // Don't validate if no file selected
    //   }

    //   if (Array.isArray(value) && value[0]?.size <= 1048576) {
    //     if (typeof value[0] === "string" && value[0].startsWith("data:image")) {
    //       // Value is a string and starts with "data:image"
    //       return true; // Valid
    //     }
    //   }

    //   return false; // Invalid
    // })
    // .test(
    //   "fileType",
    //   "Only JPEG, PNG, and GIF files are allowed",
    //   (value) => {
    //     if (
    //       (Array.isArray(value) && value.length > 0) &&
    //       ["image/jpeg", "image/png", "image/gif"].includes(value[0].type)
    //     ) {
    //       return true;
    //     }
    //     if (typeof value === "string" && value.startsWith("data:image")) {
    //       return true;
    //     }
    //     return false;
    //   }
    // )
  });

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<tFormInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
    //defaultValues: initialValues,
  });

  let date = new Date();
  const { id } = useParams();
  let year = date.getFullYear();

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onabort = (formError) => reject(formError);
      reader.readAsDataURL(file);
    });
  };

  function previewFile(e: any) {
    const reader = new FileReader();

    const selectedFile = e.target.files[0];
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
    // As the File loaded then set the stage as per the file type

    reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
      if (selectedFile.type.includes("image")) {
        const result = readerEvent.target?.result as string;
        setImagePreview(result);
      }
    };
  }
  function clearFiles() {
    setImagePreview(null);
    const img = { ...formData, receipt: "" };
    setFormData(img);
  }

  //prefilled value
  useEffect(() => {
    Object.entries(formData).forEach(([key, value]) => {
      setValue(key as keyof initialValue, value as any);
    });
    setImagePreview(formData.receipt);
  }, [formData, setValue]);

  const navigate = useNavigate();

  console.log(formData.transactionDate, "formdddddddddd");

  console.log(id, "param");

  const retrivedata: any = users;
  useEffect(() => {
    const foundData = retrivedata.find(
      (item: tFormInputs) => item.id === Number(id)
    );

    if (foundData) {
      setFormData(foundData);
      console.log(foundData, "foundData");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retrivedata, id]);

  const onSubmit = async (data: tFormInputs) => {
    const isImg64 = typeof data.receipt === "string";

    if (!isImg64) {
      const img = await getBase64(data.receipt[0]);
      console.log(img, "imggggg");
      data.receipt = img as string;
    }
    console.log(data, "data:dataa:data");

    const transactionData = {
      ...formData,
      ...data,
      id: id ? parseInt(id) : users.length + 1,
      //if id is null or undefined then parseInt(id) evaluate and the result assigned to id var
      //If  id  is falsy (null, ), then users.length + 1 is evaluated, which gives the length of the users array plus 1, and the resulting value is assigned to the id property.
    };

    if (id) {
      dispatch(updateTransaction({ id: parseInt(id), data: transactionData }));
      alert("Transaction updated successfully");
    } else {
      dispatch(addTransaction(transactionData));
      alert("Transaction added successfully");
    }

    navigate("/ViewData");
  };

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
                {...register("transactionDate")}
              />

              <span className="span1">{errors.transactionDate?.message}</span>

              <label>Month Year</label>

              <select className="input" {...register("monthYear")}>
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
              <select className="input" {...register("transactionType")}>
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
              <select className="input" {...register("fromAccount")}>
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
                // name="toAccount"
                className="input"
                defaultValue={initialValues.toAccount}
                //   onChange={onChangeHandler}
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
              <input type="number" className="input" {...register("amount")} />
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
                  {...register("receipt")}
                  onChange={previewFile}
                />
                {/* )} */}

                <span className="span1">{errors.receipt?.message}</span>
              </div>

              <label htmlFor="notes">Notes </label>
              <textarea className="input" {...register("notes")} />
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
};

export default AddTransaction;
