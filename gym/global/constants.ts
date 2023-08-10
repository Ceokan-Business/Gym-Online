export const GRADES: string [] = [ "User", "Membru", "Antrenor", "Responsabil", "Patron" ] // available grades for users
// User pentru cei ce nu au abonament 
// Membru pentru cei ce au abonament 
// Responsabil prentru cei angajati in sala 
// Antrenor si Patron de la sine inteles 

export const MONTHS = [ //lunile anului - folosite la profile
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const DAYS =  [ //zilele saptamanii - folosite la calendar
	'D', 'L', 'M', 'M', 'J', 'V', 'S' 
]

export const EMAIL_PLACEHOLDER = 'exmaple@exmaple.com'; 

export const TITLE_CANCEL_MEMBERSHIP = 'Ne pare rau'; // atunci cand un membru este data afara, ii apara o notificare pe profil. Acesta este titlul notificarii 

export const GYM_SESSION_NOTIFICATIONS =  { 
	NEW_SESSION_TITLE: "Start", 
	NEW_SESSION_DESCRIPTION: "Ai inceput o noua sedinta. Succes!", 
	HALF_MEMEBERSHIP_TITLE: "Abonament...", 
	HALF_MEMBERSHIP_DESCRIPTION: "Ai ajuns la jumatatea numarului de sedinte. Felicitari! Keep up the good work!", 
	END_MEMBERSHIP_TITLE: "Abonament...", 
	END_MEMBERSSHIP_DESCRIPTION: "Mai ai doar o sedinta din abonamentul curent. Nu uita sa il reinnoiesti.", 
	FINISHED_MEMBERSHIP_TITLE: "Final...", 
	FINISHED_MEMBERSHIP_DESCRIPTION: "Abonamentul tau s-a terminat. Te asteptam cu drag sa il reinnoiesti.", 
}