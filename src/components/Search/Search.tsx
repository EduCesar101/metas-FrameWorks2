interface SearchProps {
    search: string,
    setSearch: (search: string) => void
}

export function Search({ search, setSearch }: SearchProps){
    return (
        <div className="search">
        <h2>Pesquisar:</h2>
        <input type="text" value={search} 
        onChange={(e) => setSearch(e.target.value)} 
        placeholder="Digite para pesquisar..."/>
         </div>);
}