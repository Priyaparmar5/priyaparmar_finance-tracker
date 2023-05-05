// export const FormField = (props = {
//   //  const {name, errors={}} =props
// });
// const Field = ({
//   name,
//   options,
//   type,
//   placeholder,
//   label,
//   value,
//   onChange,
//   isValid,
//   values,
// }) => {
// //   const onChangeHandler = (event) => {
// //     console.log(event, "event");
// //     //
// //     // setFormData(event.target.files[0])
// //     //

// //     if (event.target.name === "languages") {
// //       let copy = { ...formData };

// //       if (event.target.checked) {
// //         copy.languages.push(event.target.value);
// //       } else {
// //         copy.languages = copy.languages.filter(
// //           (el) => el !== event.target.value
// //         );
// //       }

// //       setFormData(copy);
// //     } else {
// //       setFormData(() => ({
// //         ...formData,
// //         [event.target.name]: event.target.value,
// //       }));
// //     }
// //   };

//   let field = <></>;
//   switch (type) {
//     case "select":
//       field = (
//         <select
//           name={name}
//           id={id}
//           value={values[name]}
//           onChange={onChangeHandler}
//         >
//           {options.map((items) => (
//             <option key={items.value} value={items.value}>
//               {items.label}
//             </option>
//           ))}
//         </select>
//       );
//       break;
//     case "number":
//       field = (
//         <input
//           type="number"
//           id={name}
//           name={name}
//           value={value}
//           placeholder={placeholder}
//         />
//       );
//     case "date":
//       field = (
//         <input
//           type="date"
//           id={name}
//           name={name}
//           value={value[name]}
//           placeholder={placeholder}
//         />
//       );
//     case "file":
//       field = (
//         <>
//           <input
//             type="file"
//             id={name}
//             name={name}
//             placeholder={placeholder}
//             onChange={handleImg}
//           />
//           <label for={name}>
//             <div>Select File</div>
//           </label>
//         </>
//       );
//     default:
//       field = <input type="text" id={name} placeholder={placeholder} />;
//       break;
//   }
//   return (
//     <>
//       <label htmlFor={name}>{label}</label>
//       <div>{field}</div>
//     </>
//   );
// };
