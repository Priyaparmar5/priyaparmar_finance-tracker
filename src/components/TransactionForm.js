import "../App.css";
import { useForm } from "react-hook-form";

import { useState, useEffect, React, useContext ,useRef} from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGlobalContext } from "../context/TransactionContext";
import * as yup from "yup";
//import { FormField  } from "./FormFields/FormField";
import {
  monthYearList,
  fromAccountList,
  toAccountList,
  transactionTypeList,
  staticValues,
} from "../utils/constant";

function TransactionForm() {
  const [formError, setFormError] = useState({});

  const { transactionData, setTransactionData } = useGlobalContext();

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
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const filePicekerRef = useRef(null);

  const schema = yup.object().shape({
    transactionDate: yup.string().required("transactionDate is required"),
    monthYear: yup.string().required("Please select a product"),
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

    amount: yup.string().required("amount is required")
    .test('number', 'number must be greater than 1', (value) => {
      if (!value) return true; // Don't validate if no file selected
      return value && value >= 1; // 1 MB
    }),
    notes: yup.string().required("notes is required"),
    receipt: yup.mixed().test("required", "please select file", (value) => {
      return value && value.length;
    })
    .test('fileSize', 'File size is too large', (value) => {
      if (value && value[0].size <= 1048576) return true; 
      
      if(typeof(value) === String && value.startswith("data:receipt"))
      {
        return true;
      }
      return false;
    
    })
    .test('fileType', 'Only JPEG, PNG, and GIF files are allowed', (value) => {
      if (!value) return true; 
      return value &&['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
    }),
  });

  const {
    register,
    trigger,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData(URL.createObjectURL(file));
  };
  let date = new Date();

  let year = date.getFullYear();

  //const [formData, setFormData] = useState(initialValues);
  const [isSubmit, setSubmit] = useState(false);

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
    const img = {...formData,receipt:null}
    setFormData(img);
  }

  const handleImg = (event) => {
    let err = {};

    console.log(event, "eventt");
    const file = event.target.files[0];

    const data = new FileReader();
    data.addEventListener("load", () => {
      const val = { ...formData, receipt: data };
      setFormData(val);
    });
    data.readAsDataURL(file);

    getBase64(file).then((base64) => {
      const val = { ...formData, receipt: base64 };
      console.log("val", val);

      setFormData(val);
      // localStorage["receipt"] = base64;
      console.debug("file store", base64);
      console.log("fiel", base64);
    });

    const size = file.size; // it's in bytes
    console.log(size);
    if (size / 1024 > 1024) {
      err.receipt = "File size should be less than  1 mb";

      //return
    } else {
      setFormData(() => ({
        ...formData,
        [event.target.name]: event.target.value,
      }));
    }
    setFormError({ ...err });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(e.target, "heyy");
    setFormData((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));
  };

  //
  // setFormData((prevFormData) => ({
  //   ...prevFormData,
  //   [name]: value
  // }));
  //
  const onChangeHandler1 = (event) => {
    const { name, value } = event.target;
    //  setFormData({ ...formData, [name]: value });
    let newErrors = { ...formError };

    switch (name) {
      case "transactionDate":
        if (!value) {
          newErrors[name] = "transactionDate is required";
        } else {
          delete newErrors[name];
        }
        break;
      case "transactionType":
        if (!value) {
          newErrors[name] = "transactionType is required";
        } else {
          delete newErrors[name];
        }
        break;
      case "monthYear":
        if (!value) {
          newErrors[name] = "Month year is required";
        } else {
          delete newErrors[name];
        }
        break;
      case "fromAccount":
        if (!value) {
          newErrors[name] = "From account is required";
        } else {
          delete newErrors[name];
        }
        break;
      case "toAccount":
        if (!value) {
          newErrors[name] = "to account is required";
        } else {
          delete newErrors[name];
        }
        break;
      case "amount":
        if (!value) {
          newErrors[name] = "amount is required";
        } else {
          delete newErrors[name];
        }
        break;
      case "reciept":
        if (!value) {
          newErrors[name] = "receipt is required";
        } else {
          delete newErrors[name];
        }
        break;
      case "notes":
        if (!value) {
          newErrors[name] = "notes is required";
        } else {
          delete newErrors[name];
        }
        break;
      default:
        break;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setFormError(newErrors);
  };
  //prefilled value
  useEffect(() => {
    Object.entries(formData).forEach(([key, value]) => {
      // if (key === "receipt" && value) {
      //   const fileName = value.split("/").pop();
      //   setValue(key, null, { shouldDirty: true });
      //   setValue(key, { value: fileName });
      //   setValue("receipt", value.name);
      //   console.log();
      // } else {
      //   setValue(key, value);
      // }
    setValue(key, value);
    });
   setImagePreview(formData.receipt);
  }, [formData, setValue]);

  //
  // const handleSelectImage = (event) => {
  //   const file = event.target.files[0];
  //   const fileReader = new FileReader();
  //   fileReader.addEventListener("load", () => {
  //     setPreviewImage(fileReader.result);
  //   });
  //   fileReader.readAsDataURL(file);
  // };

  // const retrivedata = JSON.parse(localStorage.getItem("key")) || [];
  const navigate = useNavigate();

  const validateForm = (e) => {
    let err = {};
    const MIN_FILE_SIZE = 1024;

 

    if (!formData.transactionDate) {
      err.transactionDate = "Transaction date is required";
    }

    if (!formData.transactionType) {
      err.transactionType = "Transaction type is required";
    }

    if (formData.receipt === "") {
      err.receipt = "receipt is required";
    } else if (formData.receipt.size > MIN_FILE_SIZE) {
      err.receipt = "File size should be less than  1 mb";
    }

    if (!formData.monthYear) {
      err.monthYear = "please select anyone value";
    }

    if (!formData.fromAccount) {
      err.fromAccount = "please select anyone value";
    }

    if (!formData.toAccount) {
      err.toAccount = "please select anyone value";
    } else if (formData.fromAccount === formData.toAccount) {
      err.toAccount = "both values can't be same";
    }

    if (!formData.notes.trim()) {
      err.notes = "notes is required";
    }

    if (!formData.amount.trim()) {
      err.amount = "amount is required";
    } else if (formData.amount < 0) {
      err.amount = "amount should be greater than 0";
    } else if (isNaN(formData.amount)) {
      err.amount = "amount should be in digit ";
    }
    const data = { ...formData };

    if (Object.keys(err).length === 0) {
      console.log("hello");
      if (transactionData) {
        const retrivedata = transactionData || [];
        console.log("id", id);
        if (id) {
          for (const e in retrivedata) {
            if (parseInt(retrivedata[e].id) === parseInt(id)) {
              data["id"] = id;
              retrivedata[e] = data;
            }
          }
          console.log(retrivedata, "data");
          alert("update successfully");
        } else {
          const previd = retrivedata[retrivedata.length - 1].id;
          data["id"] = parseInt(previd) + 1;
          retrivedata.push(data);
          alert("insert successfully");
        }
        // localStorage.setItem("key", JSON.stringify(retrivedata));
        setTransactionData(retrivedata);
      } else {
        data["id"] = 1;
        //  localStorage.setItem("key", JSON.stringify([data]));
        setTransactionData([data]);
      }
      navigate("/viewData");
    }
    if (Object.keys(err).length > 0) {
      setFormError(err);
    } else {
      setFormError({});
    }
    //   setFormError( err );
  };

  console.log(formData.transactionDate, "formdddddddddd");
  //const fieldPropsCommon = { values, errors, setValues };

  const { id } = useParams();
  console.log({ id }, "param");

  const onSubmit = async (e) => {
    const value = { ...e };
    
    const isImg64 = typeof e.receipt === "string";

    if(!isImg64){
    const img = await getBase64(e.receipt[0]);
    console.log(img, "imggggg");
    e.receipt = img;
    }
    
    // const dataFile = new FileReader();
    // dataFile.addEventListener("load", () => {
    //   const val = { ...formData, receipt: dataFile };
    //   setFormData(val);
    // });
    // dataFile.readAsDataURL(img);
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
    if (transactionData) {
      const retrivedata = transactionData || [];
      console.log("id", id);
      if (id) {
        for (const e in retrivedata) {
          if (parseInt(retrivedata[e].id) === parseInt(id)) {
            data["id"] = id;
            retrivedata[e] = data;
          }
        }
        console.log(retrivedata, "data");
        alert("update successfully");
      } else {
        console.log("in insert");
        const previd = retrivedata[retrivedata.length - 1].id;
        data["id"] = parseInt(previd) + 1;
        retrivedata.push(data);
        alert("insert successfully");
      }
      setTransactionData(retrivedata);
      //localStorage.setItem("key", JSON.stringify(retrivedata));
    } else {
      data["id"] = 1;
      // localStorage.setItem("key", JSON.stringify([data]));
      setTransactionData([data]);
    }
    navigate("/viewData");
    console.log("transactionnn", transactionData);
  };

  //const retrivedata = JSON.parse(localStorage.getItem("key")) || [];
  const retrivedata = transactionData || [];

  useEffect(() => {
    for (const e in retrivedata) {
      if (parseInt(retrivedata[e].id) === parseInt(id)) {
        setFormData(retrivedata[e]);
        console.log(retrivedata[e], "retrieesfsd");
        break;
      }
    }
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
                // onChange={(e) => doSomething(e.target.value)} // Using setValue
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
                {...register(
                  "fromAccount"
                  //  name:"fromAccount",
                  //    value:formData.fromAccount,
                  //    onChange={onChangeHandler}
                )}
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
              <input type="button" className="btn" value="X" onClick={clearFiles}/>
              <div>
                <>
                {imagePreview != null && <img src={imagePreview} height={60} width={50} alt="" />}
                  {/* <img src={formData.receipt} height={60} width={50} alt="" /> */}
                  {/* {imageUrl && <img src={formData.receipt} alt="Preview" width="200" />} */}
                </>
                
                <input
                  accept="image/jpg, image/png, image/jpeg"
                  type="file"
                  className="input"
                  name="receipt"
                  {...register("receipt")}
                  onChange={previewFile}
                 
                  // onChange={handleImg}
                  //   value={formData.receipt}
                />
              
                {/* <input
                  ref={filePicekerRef}
                  accept="image/*, video/*"
                  onChange={previewFile}
                  type="file"
                  hidden
                />
              
                <button className="btn">x</button> */}
                {/* <strong>{watch('receipt')[0].name}</strong> */}

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

export default TransactionForm;
