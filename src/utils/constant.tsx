import { initialValue, userDetail } from "./Transaction"
export const monthYearList = [
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

export const fromAccountList = [
  { value: "Personal Expense", label: "Personal Expense" },
  { value: "Real Living", label: "Real Living" },
  { value: "My Dream Home", label: "My Dream Home" },
  { value: "Full circle", label: "Full circle" },
  { value: "Core Realtors", label: "Core Realtors" },
  { value: "Big Block", label: "Big Block" },
];

export const toAccountList = [
  { value: "Personal Expense", label: "Personal Expense" },
  { value: "Real Living", label: "Real Living" },
  { value: "My Dream Home", label: "My Dream Home" },
  { value: "Full circle", label: "Full circle" },
  { value: "Core Realtors", label: "Core Realtors" },
  { value: "Big Block", label: "Big Block" },
];

export const groupBySelect = [
  { value: "" ,label : "None"},
  { value: "monthYear" ,label : "monthYear"} ,
  { value: "transactionType" ,label : "transactionType"},
  { value: "fromAccount" ,label : "fromAccount"},
  { value: "toAccount" ,label : "toAccount"}
 
];

export const transactionTypeList = [
  { value: "Home Expense", label: "Home Expense" },
  { value: "Personal Expense", label: "Personal Expense" },
  { value: "Income", label: "Income" },
];


export const staticValues: initialValue[] = [
  {
    id: 1,
    transactionDate: "2023-05-13",
    monthYear: "Jun 2023",
    transactionType: "Home Expense",
    fromAccount: "Core Realtors",
    toAccount: "Real Living",
    amount: 7867,
    receipt:
      "data:image/png;base64,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",
    notes: "hgfh",
  },

  {
    id: 2,
    transactionDate: "2023-05-14",
    monthYear: "Mar 2023",
    transactionType: "Home Expense",
    fromAccount: "Full circle",
    toAccount: "Personal Expense",
    amount: 990,
    receipt:"data:image/png;base64,UklGRsQBAABXRUJQVlA4TLcBAAAvP8APEJAkSW4cSf7/ZzcANpbeZk4RUmjbNrZtf7ZtZEZbybbt72tmsm0j2Wi2bfO3/xfHkds2kkRdG4FnfQT8V4yweD2WbfQyp4rhCk4+0CQDROZ4YKJZFghMkfCOpumZko/mSZrB7XEBJrsR9iixrCHnPWgoafQbpbxRmzCS0YKcjQA1Pihnh2AfeYz84UITKJ0fkI4SAW24TE0P4HCR+EKwDUi6HB5gjRIV0Ad0/UIpn2j26C9PdywdIOVveXoElEwOSClPt7QOSG5wUJ5uWTlAUT5KfLPxyq9g49M8oDrQimGFzHAVEv1CRzlin0hFhynFBUAP8xJSB6Ad3SYA3B3zSBDjGBKMrhk85/KcP+iPkQs9elxc7vKFGwDg4OHL2S7/6UOKIcbqLuwXLVDS9jbdhW35hUPF8W26yyJxfiI+Mh8YVAyDeRGl2S5+xCAlK/Cu+AYZkNraxSsYr0wFHru7SPiPPhKYCUkfMvHdXaA3YCkgA0BGEVbQBcu7aOY/AEynTvP/uN/Ut3cBP/QOmw+s7wJxGC8YouFgFzCzV9lhAie7ACdH7Y798MORNg44Yb7rP1IAAA==",
    notes: "6776",
  },

  {
    id: 3,
    transactionDate: "2023-05-25",
    monthYear: "Jul 2023",
    transactionType: "Personal Expense",
    fromAccount: "Full circle",
    toAccount: "Real Living",
    amount: 46565e3,
    receipt:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAxCAYAAABznEEcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATDSURBVHgB7ZrPbxtFFMffzOz4d8g6dm05AsW0RbTBUQOCCxfCFXHhEC4IBKWtIrj0P+BPgBMHWvUH3Oih3Lhy4FgplFZN1KapUZFDEjvZyInt/TE7zHPqyHWSYm/W9Rr1I1k7O7tjv6/fzszbeUOgC459dTch6jIpw9FRaVEWEmLboQ2LcuaAD7i20KimRYXLQyBsIgGqxo4owY2C1U178syrs3dDaZ3lHRGOamCt6yvLlaVfPzChj+Q+vBWzMwldEG1MCnu7GzGHish+upQxOc2h8eXqn6tw42MBz5mRzxZSGuc5xqxK+YfJlcPu2y9i9meW1qdOYLFsiGK3Lu0bT54GShyxtllQ9pB9f+bTIpSAscTk6xCV1Y3vpx5DgEifXRyXlI5Wtl673ymEtp+Mxt5Uii0jaAKQ8pVTJSnodlpfPNF5bU9E+kIxx0MOK195qwQBZePqyeafm527nWmv3xWhnjshnFSzDwQctNFtsHG0uVXXFKHH2bhj2ysD78TdoGyUocQqdvZWFUVFhPFE9cfTFRgSypsTa8QWsfTZ30fwnKIXcByGYUKNTugNN54dxVOqxtiRSNwwYMgob25XpOkksUyBcfn3t+/WYdhQfUOzBJtU3UFj1Pa1M+ufL+Q5JzdVcVp9igDOR+uXCn9AH7CkrJbiToy6Ea0GPsKYROOnn5zmAbSb0CcYj5jhCA1Ratq+BnaEkOmOqrz+9fIE9AFKbaHCd0bBZ5SI9zrrNNN8FfqIryKwP6jDDDxnfBXBOf3moHonHH4EfcQ3EbtekDM9NFFt5nV9rum9I6GBT+x6QeYPvGbVcFL6Cw3mlnrcNHYGpDsDOIqpYeXY+cWibcv3jWuni+CB3kV88uClVJS83TqVgv+zcXXinjKKqF592M/MK0MBDQaGjdzOG3BuuaiOF8EDPT9OqYj7DiFurPWhmnk8fm4560r5CxwBtcJxBjzSswhCSbSzLgyCq6F1YPGX7/PEIHghwk/UqFAEjwTIE3ILPBIYEVJi2O6NwIig0i2CR4LjCfo/EHGUt79AiFCz9W9wBKgb5gwGDAF5HTzgqrc6tUYgVOjTCPfSUEq6753cBGaDVwgU1y+dvgYeUMv9MbPhWpqUZKSXhjIqb0lLvEEEb8ZQGjiPdi4fX42dv59TIe11CWRCBbP5Z36HBENFvEUVzd524o3vwCPChrCxw2uQnFsqTLYtzg4Ns4+jyS+XClhUHpHGWpKmYMhIJ4WOOT0sU+qKLSLdLMzKgXfwXhBWPd1MSiqoysBUJbBaOrmQgSEBE5KYJm6lIprzBCYudr0xBH0D114pjLe8gOxOdkpRvREptScuggrayGi90p4Q2puxt386uYbHsS/uvAIBBfOKtqWJzrziU2FH2Tj1kLBwIn3hXg4Cxti5By9L19K3avPFzmsHJOMly8SW8i5mUgOUjMdi2bjz8KCdDYdui8Dkt3BlynGhNJB8Hu5sSBYyjqVlQ5q5snZ5avWwW/9zgwrm9DAlxkKyjGmxfmeVMHrAyReN17iodfM0kG6+eE+MyrLiVh7GwXQdp+7nViGNQ8iywiMkQh1i1rco4QbOYd20705EO01B8ZgjRCgStXyZ5Rv1kNBUCje9ulD3shXpX6bN/603WALOAAAAAElFTkSuQmCC",
    notes: "fgfdgdg",
  },
  {
    id: 4,
    transactionDate: "2023-05-23",
    monthYear: "May 2023",
    transactionType: "Personal Expense",
    fromAccount: "My Dream Home",
    toAccount: "Real Living",
    amount: 777,
    receipt: "data:image/png;base64,UklGRiYBAABXRUJQVlA4TBkBAAAvP8APEHDbtpEgsf+2928Gu8o+ioBrW9sx5x3b9tRKlYtQlelj2/lyDU6dqcI+rW3b/JLSHj4TgP4eybXa8u3LsiqSDL8L+GmTPcLoFj5tkiQITMBQZUITTC0XZIqNfATo3cI8YBxi6iAmw2+M2jnEjEJMBcSE/MSonELMEDwm1xN84rIPhXDbh0N9wjMchh4Pz9cAQMoAxQTGB7xpkqwG+nMSAjXQlXOU85LzlbOTM5iTVxOnq5lDNR054RpOUBNFNZGaOF3NHFqI6eDkxMSe0rHBEEIIe0p4w3Gwv4QTbDgPrpdE0QY7dL4kshLDODkxsYck6FbDV8yhmvyaJaIFPvF44NesMKOlbPzLo6xDNn7FlyVlROifEAA=",
    notes: "nvbvv",
    }
];


export const staticUsers: userDetail[]=[

{uname: "priya", email: "parmarpriya903@gmail.com", password: "priya"}, 
{uname: "sonam", email: "abc@gmail.com", password: "123456"},
{uname: "siya", email: "siya@gmail.com", password: "siya123"},
{uname: "admin", email: "admin@gmail.com", password: "admin12"}
];
