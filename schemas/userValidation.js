import z from 'zod'

const userValidation = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long')
})

export async function validateUser (data) {
  return userValidation.safeParse(data)
}