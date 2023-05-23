export const validateFiles = (file) => {
    const maxSize = 1 * 1024 * 1024; // 1 MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (file.size > maxSize) {
    //  alert('File size exceeds 1 MB limit');
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      //alert('Only JPEG and JPG files are allowed');
      return false;
    }

    return true;
  };


export const validateForms = (formData) => {
    let err = {};
    const maxSize = 1 * 1024 ; // 1 MB

    if (!formData.transactionDate) {
          err.transactionDate = "Transaction date is required";
    }

    if (!formData.transactionType) {
        err.transactionType = "Transaction type is required";
    }    

    if (formData.receipt === "") {
      err.receipt = "receipt is required";
    } 

    else if (formData.receipt.size > maxSize) {
      err.receipt = "File size should be less than  1 mb";
    }
    //  else if (!allowedTypes.includes(formData.receipt.type)) {
    //   err.receipt = 'Only JPEG,png and JPG files are allowed';
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
    
    return err;
 //   setFormError( err );
    
  };