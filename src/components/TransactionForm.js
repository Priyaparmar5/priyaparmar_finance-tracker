import "../App.css";
import { useState, useEffect, React } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

//import { FormField  } from "./FormFields/FormField";
// import {
//   monthYearList,
// } from '../utils/constants';

function TransactionForm() {
  const monthYearList = [
    { value: "Jan 2023", label: "Jan 2023" },
    { value: "Feb 2023", label: "Feb 2023" },
    { value: "Mar 2023", label: "Mar 2023" },
    { value: "Apr 2023", label: "Apr 2023" },
    { value: "May 2023", label: "May 2023" },
    { value: "Jun 2023", label: "Jun 2023" },
    { value: "Jul 2023", label: "Jul 2023" },
    { value: "Aug 2023", label: "Aug 2023" },
    { value: "Sep 2023", label: "Sep 2023" },
    { value: "Oct 2023", label: "Oct 2023" },
    { value: "Nov 2023", label: "Nov 2023" },
    { value: "Dec 2023", label: "Dec 2023" },
  ];

  const fromAccountList = [
    { value: "Personal Expense", label: "Personal Expense" },
    { value: "Real Living", label: "Real Living" },
    { value: "My Dream Home", label: "My Dream Home" },
    { value: "Full circle", label: "Full circle" },
    { value: "Core Realtors", label: "Core Realtors" },
    { value: "Big Block", label: "Big Block" },
  ];

  const toAccountList = [
    { value: "Personal Expense", label: "Personal Expense" },
    { value: "Real Living", label: "Real Living" },
    { value: "My Dream Home", label: "My Dream Home" },
    { value: "Full circle", label: "Full circle" },
    { value: "Core Realtors", label: "Core Realtors" },
    { value: "Big Block", label: "Big Block" },
  ];

  const transactionTypeList = [
    { value: "Home Expense", label: "Home Expense" },
    { value: "Personal Expense", label: "Personal Expense" },
    { value: "Income", label: "Income" },
  ];

  const [formError, setFormError] = useState({});
  let date = new Date();
  let year = date.getFullYear();

  const initialValues = {
    transactionDate: "",
    monthYear: "",
    transactionType:"",
    fromAccount:"",
    toAccount:"",
    amount: "",
    receipt: "",
    notes: "",
  };

  // const FieldWrapper = ({ setValues, ...rest }) => (
  //   <FormField
  //     {...rest}
  //     onChange={(value) => {
  //       setValues((old) => ({ ...old, [rest.name]: value }));
  //     }}
  //   />
  // );
  // //let fileInput =React.createRef();

  const [formData, setFormData] = useState(initialValues);
  const [isSubmit, setSubmit] = useState(false);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onabort = (formError) => reject(formError);
      reader.readAsDataURL(file);
    });
  };

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

  const handleRemove = () => {
    setFormData({ ...formData, receipt: "" });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
  //  setFormData({ ...formData, [name]: value });
  let newErrors = { ...formError };

  switch (name) {
    case 'transactionDate':
      if (!value) {
        newErrors[name] = 'transactionDate is required';
      } else {
        delete newErrors[name];
      }
      break;
    case 'transactionType':
      if (!value) {
        newErrors[name] = 'transactionType is required';
      }else {
        delete newErrors[name];
      }
      break;
    case 'monthYear':
        if (!value) {
          newErrors[name] = 'Month year is required';
        } else {
          delete newErrors[name];
        }
        break;
    case 'fromAccount':
        if (!value) {
          newErrors[name] = 'From account is required';
        } else {
          delete newErrors[name];
        }
        break;
    case 'toAccount':
          if (!value) {
            newErrors[name] = 'to account is required';
          } else {
            delete newErrors[name];
          }
          break;
    case 'amount':
          if (!value) {
            newErrors[name] = 'amount is required';
          } else {
            delete newErrors[name];
          }
          break;
    case 'reciept':
          if (!value) {
            newErrors[name] = 'receipt is required';
          } else {
            delete newErrors[name];
          }
          break;
    case 'notes':
          if (!value) {
            newErrors[name] = 'notes is required';
          } else {
            delete newErrors[name];
          }
            break;
      default:
        break;
    }
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
    setFormError(newErrors);

  };

  const retrivedata = JSON.parse(localStorage.getItem("key")) || [];
  const navigate = useNavigate();

  // const validate = (event) => {
  //   let err = {};
  //   if (event.target.value === "") {
  //     err = "select value";
  //   }
  // };

  const validateForm = (e) => {
    let err = {};
    const MIN_FILE_SIZE = 1024;

    // const fileExtension = formData.receipt.split(".").at(-1);
    // const allowedFileTypes = ["jpg", "png", "jpeg"];
    // if (!allowedFileTypes.includes(fileExtension)) {
    //     //indow.alert(`File does not support. Files type must be ${allowedFileTypes.join(", ")}`);
    //     return false;
    //     err.receipt = "file does not support other extension";

    // }

    // const fileSizeKiloBytes = formData.receipt.size / 1024;
    //console.log(formData.receipt.size, "sizeeeeee");
    //console.log(fileSizeKiloBytes, "filesizekb..");

    // if (formData.receipt.size > 1024) {
    //   err.receipt = "size";
    // }
    

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

    // if (formData.transactionDate === "") {
    //   err.transactionDate = "transaction date required";
    // }

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
      if (localStorage.getItem("key")) {
        const retrivedata = JSON.parse(localStorage.getItem("key")) || [];
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
        localStorage.setItem("key", JSON.stringify(retrivedata));
      } else {
        data["id"] = 1;
        localStorage.setItem("key", JSON.stringify([data]));
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
 
 
  const handleSubmit = (e) => {
    e.preventDefault();
    
    let isValid = validateForm();
  
    const data = { ...formData };
    console.log(data, "datuuuu");
    console.log(isValid,"isvaliddd")
 
  };

  useEffect(() => {
    for (const e in retrivedata) {
      if (parseInt(retrivedata[e].id) === parseInt(id)) {
        setFormData(retrivedata[e]);
        console.log(retrivedata, "retrieesfsd");
        break;
      }
    }
  }, []);
  return (
    <>
      <ul>
          <Link to="/ViewData" className="add-btn">ViewData</Link>
        
      </ul>
      <form onSubmit={handleSubmit}>
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
                value={formData.transactionDate}
                onChange={onChangeHandler}
              />
              
              <span className="span1">{formError.transactionDate}</span>

              <label>Month Year</label>

              <select
                name="monthYear"
                className="input"
                value={formData.monthYear}
                onChange={onChangeHandler}
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
              <span className="span1">{formError.monthYear}</span>
             

              <label>Transaction Type</label>
              <select
                name="transactionType"
                className="input"
                value={formData.transactionType}
                  onChange={onChangeHandler}
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
             
              <span className="span1">{formError.transactionType}</span>

              <label>From Account</label>
              <select
                name="fromAccount"
                className="input"
                value={formData.fromAccount}
                onChange={onChangeHandler}
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
             
              <span className="span1">{formError.fromAccount}</span>

              <label>To Account</label>

              <select
                name="toAccount"
                className="input"
                value={formData.toAccount}
                onChange={onChangeHandler}
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

              <span className="span1">{formError.toAccount}</span>

              <label htmlFor="amount">Amount </label>
              <input
                className="input"
                name="amount"
                value={formData.amount}
                onChange={onChangeHandler}
              />
              <span className="span1">{formError.amount}</span>

              <label htmlFor="receipt">Receipt </label>
              <div>
                  <>
                    <img
                      src={formData.receipt}
                      height={60}
                      width={50}
                      alt=""
                    ></img>
                    {/* <button type="button" value="remove" onclick={handleRemove}>
                      remove
                    </button> */}
                  </>
               
                  <input
                    accept="image/jpg, image/png, image/jpeg"
                    type="file"
                    className="input"
                    name="receipt"
                    value={formData.receipt}
                    onChange={handleImg}
                  />
                <span className="span1">{formError.receipt}</span>
              </div>

              <label htmlFor="notes">Notes </label>
              <textarea
                className="input"
                name="notes"
                maxLength="250"
                value={formData.notes}
                onChange={onChangeHandler}
              />
              <span className="span1">{formError.notes}</span>

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
