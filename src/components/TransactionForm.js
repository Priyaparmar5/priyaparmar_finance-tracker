import "../App.css";
import { useState, useEffect ,React} from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

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
  const [formError, setFormError] = useState({});
  let date = new Date();
  let year = date.getFullYear();

  const initialValues = {
    transactionDate: "",
    monthYear: {
      monthYearList,
    },
    transactionType: "",
    fromAccount: "",
    toAccount: "",
    amount: "",
    receipt: "",
    notes: "",
  };

  //let fileInput =React.createRef();


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
    const val = { ...formData, receipt: null };
   //formData.receipt = "";
    setFormData(val);
    //fileInput.current.value = null
  };

  const onChangeHandler = (event) => {
    console.log(event, "event");
    //
    // setFormData(event.target.files[0])
    //

    if (event.target.name === "languages") {
      let copy = { ...formData };

      if (event.target.checked) {
        copy.languages.push(event.target.value);
      } else {
        copy.languages = copy.languages.filter(
          (el) => el !== event.target.value
        );
      }

      setFormData(copy);
    } else {
      setFormData(() => ({
        ...formData,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const navigate = useNavigate();
  const validateForm = () => {
    let err = {};
    const MIN_FILE_SIZE = 1024;

    // const fileExtension = formData.receipt.split(".").at(-1);
    // const allowedFileTypes = ["jpg", "png", "jpeg"];
    // if (!allowedFileTypes.includes(fileExtension)) {
    //     //indow.alert(`File does not support. Files type must be ${allowedFileTypes.join(", ")}`);
    //     return false;
    //     err.receipt = "file does not support other extension";

    // }

    const fileSizeKiloBytes = formData.receipt.size / 1024;
    console.log(formData.receipt.size, "sizeeeeee");
    console.log(fileSizeKiloBytes, "filesizekb..");

    if (formData.receipt.size > 1024) {
      err.receipt = "size";
    }
    if (formData.receipt === "") {
      err.receipt = "receipt is required";
    } else if (formData.receipt.size > MIN_FILE_SIZE) {
      err.receipt = "File size should be less than  1 mb";
    }

    if (formData.transactionDate === "") {
      err.transactionDate = "transaction date required";
    }

    if (formData.monthYear === "") {
      err.monthYear = "please select anyone value";
    }

    if (formData.fromAccount === "") {
      err.fromAccount = "please select anyone value";
    }

    if (formData.transactionType === "") {
      err.transactionType = "please select anyone value";
    }

    if (formData.toAccount === "") {
      err.toAccount = "please select anyone value";
    } else if (formData.fromAccount == formData.toAccount) {
      err.toAccount = "both values can't be same";
    }

    if (formData.notes === "") {
      err.notes = "notes is required";
    }

    if (formData.amount === "") {
      err.amount = "amount is required";
    } else if (formData.amount < 0) {
      err.amount = "amount should be greater than 0";
    } else if (isNaN(formData.amount)) {
      err.amount = "amount should be in digit ";
    }
    // else if(formData.amount.trim() == "")
    // {
    //     err.amount= "this field can't be empty";
    // }
    else if (isNaN(formData.amount)) {
      err.amount = "amount must be in digit";
    }

    setFormError({ ...err });
    const data = { ...formData };

    return Object.keys(err).length < 1;
  };

  const { id } = useParams();
  console.log({ id }, "param");
  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = validateForm();

    const data = { ...formData };
    console.log(data, "datuuuu");
    console.log(data.id, "dataid");
    console.log("dataaaaa", data);
    const isSubmit = true;
    //   if(isValid){
    //     if (localStorage.getItem("key")) {

    //         const retrivedata = JSON.parse(localStorage.getItem("key"));
    //         console.log("retrieve data", retrivedata);
    //         retrivedata.push(data);

    //         localStorage.setItem("key", JSON.stringify(retrivedata));
    //     } else {
    //         localStorage.setItem("key", JSON.stringify([data]));
    //     }
    // }
    if (isValid) {
      console.log("hello");
      if (localStorage.getItem("key")) {
        const retrivedata = JSON.parse(localStorage.getItem("key")) || [];
        console.log("id", data.id);
        if (id) {
          for (const e in retrivedata) {
            if (parseInt(retrivedata[e].id) === parseInt(id)) {
              console.log(e.id, "hiiii");
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
  };
  const retrivedata = JSON.parse(localStorage.getItem("key")) || [];
  useEffect(() => {
    // for (const e in retrivedata) {
    //   if (parseInt(retrivedata[e].id) === parseInt(id)) {
    //     setFormData(retrivedata);
    //     break;
    //   }
    // }
  }, []);
  return (
    <>
      <ul>
        <li>
          <Link to="/ViewData">ViewData</Link>
        </li>
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
                onChange={onChangeHandler}
                value={formData.transactionDate}
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

              {/* <select
                className="input"
                name="monthYear"
                value={formData.monthYear}
                onChange={onChangeHandler}
              >
                <option selected >
                  Select language
                </option>
                <option value="jan ${year}">Jan {year}</option>
                <option value="feb ${year}">feb {year}</option>
                <option value="mar ${year}">mar {year}</option>
                <option value="apr ${year}">apr {year}</option>
                <option value="may ${year}">may {year}</option>
                <option value="jun ${year}">jun {year}</option>
                <option value="jul ${year}">jul {year}</option>
                <option value="aug ${year}">aug {year}</option>
                <option value="sep ${year}">sep {year}</option>
                <option value="oct ${year}">oct {year}</option>
                <option value="nov ${year}">nov {year}</option>
                <option value="dec ${year}">dec {year}</option>
              </select> */}
              <span className="span1">{formError.monthYear}</span>

              <label>Transaction Type</label>
              <select
                className="input"
                name="transactionType"
                onChange={onChangeHandler}
                value={formData.transactionType}
              >
                <option value="Home Expense">Home Expense</option>
                <option value="Personal Expense">Personal Expense</option>
                <option value="Income">Income</option>
              </select>
              <span className="span1">{formError.transactionType}</span>

              <label>From Account</label>
              <select
                className="input"
                name="fromAccount"
                onChange={onChangeHandler}
                //  value={formData.fromAccount}
              >
                <option value="Personal Expense">Personal Account</option>
                <option value="Real Living">Real Living </option>
                <option value="My Dream Home">My Dream Home</option>
                <option value="Full circle">Full circle</option>
                <option value="Core Realtors">Core Realtors</option>
                <option value="Big Block">Big Block</option>
              </select>
              <span className="span1">{formError.fromAccount}</span>

              <label>To Account</label>
              <select
                className="input"
                name="toAccount"
                onChange={onChangeHandler}
                value={formData.toAccount}
              >
                <option value="Personal Expense">Personal Account</option>
                <option value="Real Living">Real Living </option>
                <option value="My Dream Home">My Dream Home</option>
                <option value="Full circle">Full circle</option>
                <option value="Core Realtors">Core Realtors</option>
                <option value="Big Block">Big Block</option>
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
                <input
                 
                  type="file"
                  className="input"
                  name="receipt"
                  // value={formData.receipt }
                  onChange={handleImg}
                />
                <button type="button" value="remove" onclick={handleRemove}>
                  remove
                </button>
                <img src={formData.receipt} height={60} width={50} alt=""></img>
              </div>
              <span className="span1">{formError.receipt}</span>

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