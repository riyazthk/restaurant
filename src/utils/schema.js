import * as Yup from 'yup';

const numberValidation = new RegExp(/^[0-9]{10}$/);
// const nameValidation = new RegExp(/^[^\s*]{1,}[a-zA-Z-_/&.,:'"\s*]{1,}$/);
const nameValidation = new RegExp(/^[^\s*]{2,}[a-zA-Z0-9-_/.&\s*@'"]{0,}$/);
// const addressValidation = new RegExp(
//   /^[^\s*]{1,}[a-zA-Z0-9-_/&,:'*@();".\s*]{1,}$/,
// );
// const valueValidation = new RegExp(/^[^0]{1,}[0-9]{0,8}(.[0-9]{1,3})?$/);
const emailIdValidation = new RegExp(
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
);

export const SignUpSchema = lan_val_keys =>
  Yup.object({
    full_name: Yup.string()
      .required('Please enter your full name')
      .matches(nameValidation, 'Enter a valid name'),
    email_id: Yup.string()
      .required('Please enter your Email Id')
      .matches(emailIdValidation, 'Email Id is not valid'),
    password: Yup.string()
      .required('Please enter your password')
      .min(6, ({min}) => 'Password must be at least 6 character'),
    // mobile_number: Yup.string()
    //   .required(lan_val_keys?.Pleaseenteryoumobilenumber)
    //   .matches(numberValidation, lan_val_keys?.Phonenumberisnotvalid),
    // password: Yup.string()
    //   .required(lan_val_keys?.Pleaseenteryourpassword)
    //   .min(6),
  });

export const LogInSchema = () =>
  Yup.object({
    email_id: Yup.string()
      .required('Please enter your Email Id')
      .matches(emailIdValidation, 'Email Id is not valid'),
    password: Yup.string().required('Please enter your password').min(6),
  });

export const profileSchema = () =>
  Yup.object({
    full_name: Yup.string()
      .required('Please enter your full name')
      .matches(nameValidation, 'Full name is incorrect'),
    email_id: Yup.string()
      .required('Please enter your Email Id')
      .matches(emailIdValidation, 'Email Id is not valid'),
  });

export const EmailIdSchema = () =>
  Yup.object({
    email_id: Yup.string()
      .required('Please enter your Email Id')
      .matches(emailIdValidation, 'Email Id is not valid'),
  });

export const resetPasswordSchema = () =>
  Yup.object({
    password: Yup.string().required('Please enter your password').min(6),
    confirm_password: Yup.string()
      .required('Please enter your confirm password')
      .min(6)
      .when('password', {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          'Both password need to be the same',
        ),
      }),
  });

// export const ForgotPasswordSchema = lan_val_keys =>
//   Yup.object({
//     mobile_number: Yup.string()
//       .required(lan_val_keys?.Pleaseenteryoumobilenumber)
//       .matches(numberValidation, lan_val_keys?.Phonenumberisnotvalid),
//   });

// export const AddProfileSchema = lan_val_keys =>
//   Yup.object({
//     firm_name: Yup.string()
//       .required(lan_val_keys?.PleaseenteryourfirmName)
//       .matches(nameValidation, lan_val_keys?.fullNameisincorrect),
//     email_id: Yup.string()
//       .email(lan_val_keys?.Enteravalidemailaddress)
//       .required(lan_val_keys?.pleaseenteryouremailid),
//     address: Yup.string()
//       .required(lan_val_keys?.pleaseenteryouraddress)
//       .matches(addressValidation, lan_val_keys?.addressisIncorrect),
//     city: Yup.string().required(lan_val_keys?.pleaseenteryourcity),
//   });

// export const generalInfoSchema = (lan_val_keys, type) =>
//   Yup.object({
//     sellerName: Yup.string()
//       .required(lan_val_keys?.enteraSellerName)
//       .matches(nameValidation, lan_val_keys?.enteravalidsellerName),
//     sellerCode: Yup.string()
//       .required(lan_val_keys?.enterasellercode)
//       .matches(nameValidation, lan_val_keys?.enteravalidsellercode),
//     quality: Yup.string().required(lan_val_keys?.selectanquality),
//     lotSize: Yup.string().required(lan_val_keys?.enteryourlotsize),
//     lotSizeType: Yup.string().required(lan_val_keys?.selectyourlottype),
//     sampleName: Yup.string()
//       .required(lan_val_keys?.enterasampleName)
//       .matches(nameValidation, lan_val_keys?.enteravalidsamplename),
//     sampleSource: Yup.string()
//       // .required(lan_val_keys?.enterasampleSource)
//       .required(lan_val_keys?.enteravalidsamplesource)
//       .matches(nameValidation, lan_val_keys?.enteravalidsamplesource),
//   });

// export const EditProfileSchema = lan_val_keys =>
//   Yup.object({
//     firm_name: Yup.string()
//       .required(lan_val_keys?.PleaseenteryourfirmName)
//       .matches(nameValidation, lan_val_keys?.fullNameisincorrect),
//     email_id: Yup.string()
//       .email(lan_val_keys?.Enteravalidemailaddress)
//       .required(lan_val_keys?.pleaseenteryouremailid),
//     address: Yup.string()
//       .required(lan_val_keys?.pleaseenteryouraddress)
//       .matches(addressValidation, lan_val_keys?.addressisIncorrect),
//     city: Yup.string().required(lan_val_keys?.pleaseenteryourcity),
//     full_name: Yup.string()
//       .required(lan_val_keys?.Pleaseenteryourfullname)
//       .matches(nameValidation, lan_val_keys?.fullNameisincorrect),
//   });

// export const contactUsValidation = lan_val_keys =>
//   Yup.object({
//     name: Yup.string().required(lan_val_keys?.PleaseEnteraName),
//     mobile_number: Yup.string()
//       .required(lan_val_keys?.Pleaseenteryoumobilenumber)
//       .matches(numberValidation, lan_val_keys?.Phonenumberisnotvalid),
//     email: Yup.string()
//       .email(lan_val_keys?.Enteravalidemailaddress)
//       .required(lan_val_keys?.pleaseenteryouremailid),
//     address: Yup.string()
//       .required(lan_val_keys?.pleaseenteryouraddress)
//       .matches(addressValidation, lan_val_keys?.addressisIncorrect),
//     feedback: Yup.string().required(lan_val_keys?.pleaseenteryourFeedback),
//     // .matches(addressValidation, lan_val_keys?.FeedbackIsIncorrect),
//   });
