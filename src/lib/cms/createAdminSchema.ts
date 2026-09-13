import * as Yup from 'yup'

/** Validates direct admin-account provisioning on the Team page. */
export const createAdminSchema = Yup.object({
  email: Yup.string().trim().lowercase().required('Email is required').email('Enter a valid email address'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Use at least 8 characters')
    .matches(/[a-zA-Z]/, 'Include at least one letter')
    .matches(/[0-9]/, 'Include at least one number'),
})

export type CreateAdminInput = Yup.InferType<typeof createAdminSchema>
