// Ajuste en data.js
export const matches = [
  { id: 1, teams: "Equipo A vs Equipo B", status: "Finalizado" },
  { id: 2, teams: "Equipo C vs Equipo D", status: "Finalizado" },
  { id: 3, teams: "Equipo E vs Equipo F", status: "En curso" }, // NO DEBE MOSTRARSE
];

export const incidentData = [
  {
    id: 1,
    referee: "Carlos Gomez",
    match: "Equipo A vs Equipo B",
    minute: 35,
    type: "Falta",
    description: "Jugador cometió una falta grave",
    card: "Amarilla",
  },
  {
    id: 2,
    referee: "Luis Fernandez",
    match: "Equipo C vs Equipo D",
    minute: 70,
    type: "Balonmano",
    description: "El defensa tocó el balón con la mano dentro del área",
    card: "Roja",
  },
];

export const referees = [
{ 
  id:1,
  name:"Carlos Gomez"
},
];