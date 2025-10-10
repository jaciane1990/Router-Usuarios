import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"

function BuscarUsuario() {
  const [id, setId] = useState<string>("")
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmedId = id.trim()
    if (trimmedId !== "") {
      navigate(`/usuario/${trimmedId}`)
    }
  }

  return (
    <div>
      <h2>Buscar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userId">Digite o ID do usuário:</label>
        <input
          type="number"
          id="userId"
          value={id}
          onChange={e => setId(e.target.value)}
          min={1}
          required
          style={{ marginLeft: "10px" }}
        />
        <button type="submit" style={{ marginLeft: "10px" }}>Buscar</button>
      </form>
    </div>
  )
}

export default BuscarUsuario
