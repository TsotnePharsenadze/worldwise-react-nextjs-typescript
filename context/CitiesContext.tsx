import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  ReactNode,
} from "react";
import { City } from "@prisma/client";
import getCurrentUser from "@/actions/getCurrentUser";

interface State {
  cities: City[];
  isLoading: boolean;
  currentCity: City | null;
  error: string;
}

interface Action {
  type:
    | "loading"
    | "cities/loaded"
    | "city/loaded"
    | "city/created"
    | "city/deleted"
    | "rejected";
  payload?: any;
}

const initialState: State = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/deleted":
      return { ...state, isLoading: false, cities: action.payload };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

interface CitiesContextType extends State {
  getCity: (id: number) => Promise<void>;
  createCitty: (cityData: Partial<City>) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;
}

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

interface CitiesContextProviderProps {
  children: ReactNode;
}

export function CitiesContextProvider({
  children,
}: CitiesContextProviderProps) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const getCity = useCallback(async (id: number) => {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`/api/cities/${id}`);
      const data: City[] = await res.json();
      const targetCity = data.find((city) => city.id === id);
      dispatch({ type: "city/loaded", payload: targetCity });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error while fetching the data",
      });
    }
  }, []);

  const createCitty = async (cityData: Partial<City>) => {
    try {
      dispatch({ type: "loading" });
      const res = await fetch("/api/city", {
        method: "POST",
        body: JSON.stringify(cityData),
        headers: { "Content-Type": "application/json" },
      });
      const data: City = await res.json();
      const updatedCities = [...cities, data].sort((a, b) => b.id - a.id);
      dispatch({ type: "city/created", payload: updatedCities });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error while creating city",
      });
    }
  };

  const deleteCity = async (id: number) => {
    try {
      dispatch({ type: "loading" });
      await fetch(`api/cities/${id}`, {
        method: "DELETE",
      });
      const updatedCities = cities
        .filter((city) => city.id !== id)
        .sort((a, b) => b.id - a.id);
      dispatch({ type: "city/deleted", payload: updatedCities });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error while deleting the city",
      });
    }
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        dispatch({ type: "loading" });
        const data = await getCurrentUser();
        const sortedData = data?.citiesId?.sort((a, b) => b.id - a.id);
        dispatch({ type: "cities/loaded", payload: sortedData });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error while fetching the data",
        });
      }
    }
    fetchData();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCitty,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error(
      "CitiesContext must be used within a CitiesContextProvider"
    );
  }
  return context;
}
