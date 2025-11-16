const form = document.getElementById("searchForm")
const input = document.getElementById("nameInput")
const error = document.getElementById("error")
const results = document.getElementById("results")

form.addEventListener("submit", async evt => {
  evt.preventDefault()

  const name = input.value.trim()

  if (name.length < 2) {
    error.textContent = "Name must be at least 2 characters."
    return
  }

  error.textContent = ""

  try {
    const url = `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(name)}`
    const resp = await fetch(url)
    const data = await resp.json()
    console.log(data)

    if (data.error) {
      results.innerHTML = "<p>No characters found.</p>"
      return
    }

    if (!data.results) {
      results.innerHTML = "<p>No characters found.</p>"
      return
    }

    results.innerHTML = data.results.map(ch => {
      return `
        <div class="card">
          <img src="${ch.image}" alt="${ch.name}">
          <h2>${ch.name}</h2>
          <p>Species: ${ch.species}</p>
          <p>Status: ${ch.status}</p>
        </div>
      `
    }).join("")

  } catch (e) {
    results.innerHTML = "<p>Something went wrong.</p>"
  }
})
