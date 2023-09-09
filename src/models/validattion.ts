import * as yup from "yup";

const imageSchema = yup.object().shape({
  name: yup.string().required("Image should have a name"),
  size: yup.number().max(10000000, "Image can't be larger of 10MB"),
  mimetype: yup
    .mixed()
    .oneOf(["image/jpeg", "image/png"], "Please upload only .jpeg/jpg or .png"),
});

export { imageSchema };
