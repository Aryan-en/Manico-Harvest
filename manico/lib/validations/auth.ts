import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1).max(80).optional(),
})

export const VerifyEmailSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
})

export const ResendVerificationSchema = z.object({
  email: z.string().email(),
})

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
})

export const ExchangeResetTokenSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
})

export const ResetPasswordSchema = z.object({
  newPassword: z.string().min(6),
  token: z.string().min(1),
})
