export type Usuario = {
  id: number
  nombre: string
  apellido: string
  email: string
  password: string
  rol?:'Admin | Usuario'
}