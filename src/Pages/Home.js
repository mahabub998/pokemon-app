import React, { useState } from "react";
import Search from "./../Components/Search";
import { fetchPokemon } from "./Services/GetPokemon";
import PokemonData from "./../Components/PokemonData";
import { Alert, Spinner } from "react-bootstrap";
import { set } from "mongoose";

const spinnerStyle = {
  width: "10rem",
  height: "10rem",
  borderWidth: "1rem",
};
const SpinnerWrapperStyle = {
  textAlign: "center",
  marginTop: "50px",
};

const Home = () => {
  const [pokemon, setPokemon] = useState();
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(false);
  const [errorMessage,setErrorMessage] = useState('');
  const getPokemon = async (query) => {
if(!query){
    setErrorMessage("Enter the valid must")
     setError(true)
     return;
}
  setError(false)


    setLoading(true);
    setTimeout(async () => {
      try{
        const response = await fetchPokemon(query);
        const results = await response.json();
        console.log(results);
        setPokemon(results);
        setLoading(false);
      }catch(err){
          console.log(err)
          setLoading(false)
          setError(true)
          setErrorMessage('pokemon not found')
      }
    }, 1500);
  };

  return (
    <div>
    {error ? (<Alert variant="danger">
    {errorMessage}
    </Alert>
    ): null}
      <Search getPokemon={getPokemon} />
      {loading ? (
        <div style={SpinnerWrapperStyle}>
          <Spinner style={spinnerStyle} animation="border" />{" "}
        </div>
      ) : null}
      {!loading && pokemon ? (
        <PokemonData
          name={pokemon.name}
          sprite={pokemon.sprites.front_default}
          abilities={pokemon.abilities}
          stats={pokemon.stats}
          types={pokemon.types}
        />
      ) : null}
    </div>
  );
};

export default Home;
