var User        = require("./models/user"),
    Product     = require("./models/product"),
    Store       = require("./models/store"),
    Order       = require("./models/order"),
    Deliveryman = require("./models/deliveryman");
    
function seedDB(){
    //Remove
    User.remove({}, function(err){
        if(err){ console.log(err); }
        else {
            //Admin
            User.register({
                type: "admin",
                username: "admin@ceid.upatras.gr",
                phoneNumber: "6987654000"
            }, "admin", (err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος διαχειριστής!");
                }
            });
            //Customers
            User.register({
                type: "customer",
                username: "customer@ceid.upatras.gr",
                phoneNumber: "6987654321"
            }, "customer", (err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος χρήστης!");
                }
            });
            
            //Managers
            User.register({
                type: "manager",
                username: "manager1@ceid.upatras.gr",
                phoneNumber: "6987654301"
            }, "manager1", (err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος υπεύθυνος!");
                }
            });
            User.register({
                type: "manager",
                username: "manager2@ceid.upatras.gr",
                phoneNumber: "6987654302"
            }, "manager2", (err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος υπεύθυνος!");
                }
            });
            User.register({
                type: "manager",
                username: "manager3paradiso.gr",
                phoneNumber: "6987654303"
            }, "manager3", (err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος υπεύθυνος!");
                }
            });
            User.register({
                type: "manager",
                username: "manager4@ceid.upatras.gr",
                phoneNumber: "6987654304"
            }, "manager4", (err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος υπεύθυνος!");
                }
            });
            User.register({
                type: "manager",
                username: "manager5@ceid.upatras.gr",
                phoneNumber: "6987654305"
            }, "manager5", (err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος υπεύθυνος!");
                }
            });
            User.register({
                type: "manager",
                username: "manager6@ceid.upatras.gr",
                phoneNumber: "6987654306"
            }, "manager6",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος υπεύθυνος!");
                }
            });
            User.register({
                type: "manager",
                username: "manager7@ceid.upatras.gr",
                phoneNumber: "6987654307"
            }, "manager7",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος υπεύθυνος!");
                }
            });
            User.register({
                type: "manager",
                username: "manager8@ceid.upatras.gr",
                phoneNumber: "6987654308"
            }, "manager8",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος υπεύθυνος!");
                }
            });
            User.register({
                type: "manager",
                username: "manager9@ceid.upatras.gr",
                phoneNumber: "6987654309"
            }, "manager9",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος υπεύθυνος!");
                }
            });
            User.register({
                type: "manager",
                username: "manager10@ceid.upatras.gr",
                phoneNumber: "6987654310"
            }, "manager10",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος υπεύθυνος!");
                }
            });
            //Delivery
            User.register({
                type: "deliveryman",
                username: "delivery1@ceid.upatras.gr",
                phoneNumber: "6987654001"
            }, "delivery1",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος ντελιβεράς!");
                }
            });
            User.register({
                type: "deliveryman",
                username: "delivery2@ceid.upatras.gr",
                phoneNumber: "6987654002"
            }, "delivery2",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος ντελιβεράς!");
                }
            });
            User.register({
                type: "deliveryman",
                username: "delivery3@ceid.upatras.gr",
                phoneNumber: "6987654003"
            }, "delivery3",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος ντελιβεράς!");
                }
            });
            User.register({
                type: "deliveryman",
                username: "delivery4@ceid.upatras.gr",
                phoneNumber: "6987654004"
            }, "delivery4",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος ντελιβεράς!");
                }
            });
            User.register({
                type: "deliveryman",
                username: "delivery5@ceid.upatras.gr",
                phoneNumber: "6987654005"
            }, "delivery5",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος ντελιβεράς!");
                }
            });
            User.register({
                type: "deliveryman",
                username: "delivery6@ceid.upatras.gr",
                phoneNumber: "6987654006"
            }, "delivery6",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος ντελιβεράς!");
                }
            });
            User.register({
                type: "deliveryman",
                username: "delivery7@ceid.upatras.gr",
                phoneNumber: "6987654007"
            }, "delivery7",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος ντελιβεράς!");
                }
            });
            User.register({
                type: "deliveryman",
                username: "delivery8@ceid.upatras.gr",
                phoneNumber: "6987654008"
            }, "delivery8",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος ντελιβεράς!");
                }
            });
            User.register({
                type: "deliveryman",
                username: "delivery9@ceid.upatras.gr",
                phoneNumber: "6987654009"
            }, "delivery9",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος ντελιβεράς!");
                }
            });
            User.register({
                type: "deliveryman",
                username: "delivery10@ceid.upatras.gr",
                phoneNumber: "6987654010"
            }, "delivery10",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος ντελιβεράς!");
                }
            });
            User.register({
                type: "deliveryman",
                username: "delivery11@ceid.upatras.gr",
                phoneNumber: "6987654011"
            }, "delivery11",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος ντελιβεράς!");
                }
            });
            User.register({
                type: "deliveryman",
                username: "delivery12@ceid.upatras.gr",
                phoneNumber: "6987654012"
            }, "delivery12",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος ντελιβεράς!");
                }
            });
            User.register({
                type: "deliveryman",
                username: "delivery13@ceid.upatras.gr",
                phoneNumber: "6987654013"
            }, "delivery13",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος ντελιβεράς!");
                }
            });
            User.register({
                type: "deliveryman",
                username: "delivery14@ceid.upatras.gr",
                phoneNumber: "6987654014"
            }, "delivery14",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος ντελιβεράς!");
                }
            });
            User.register({
                type: "deliveryman",
                username: "delivery15@ceid.upatras.gr",
                phoneNumber: "6987654015"
            }, "delivery15",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος ντελιβεράς!");
                }
            });
            User.register({
                type: "deliveryman",
                username: "delivery16@ceid.upatras.gr",
                phoneNumber: "6987654016"
            }, "delivery16",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος ντελιβεράς!");
                }
            });
            User.register({
                type: "deliveryman",
                username: "delivery17@ceid.upatras.gr",
                phoneNumber: "6987654017"
            }, "delivery17",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος ντελιβεράς!");
                }
            });
            User.register({
                type: "deliveryman",
                username: "delivery18@ceid.upatras.gr",
                phoneNumber: "6987654018"
            }, "delivery18",(err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος ντελιβεράς!");
                }
            });
            User.register({
                type: "deliveryman",
                username: "delivery19@ceid.upatras.gr",
                phoneNumber: "6987654019"
            },"delivery19", (err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος ντελιβεράς!");
                }
            });
            User.register({
                type: "deliveryman",
                username: "delivery20@ceid.upatras.gr",
                phoneNumber: "6987654020"
            }, "delivery20", (err, man) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέος ντελιβεράς!");
                }
            });
        }
    });
    Store.remove({}, function(err){
        if(err){ console.log(err); }
        else {
            
            //Stores
            Store.create({
            name: "CoffeeParadiso Αγία Σοφία",
            address: "Αγίας Σοφίας 16, Πάτρα 262 23, Ελλάδα",
            phoneNumber: "2610-430001",
            manager: {
                username: "manager1@ceid.upatras.gr",
                password: "manager1",
                name: "ΓΕΩΡΓΙΟΣ",
                surname: "ΜΠΕΙΚΟΝΙΟΣ",
                AFM: "1234567890",
                AMKA: "01019623654",
                IBAN: "GR4648923784034423478422901"
            },
            location: {
                lat: 38.2566,
                lng: 21.74313
            },
            "product": [
                {
                    "quantity": 0,
                    "name": "Τυρόπιτα"
                },
                {
                    "quantity": 0,
                    "name": "Χορτόπιτα"
                },
                {
                    "quantity": 0,
                    "name": "Κουλούρι"
                },
                {
                    "quantity": 0,
                    "name": "Τοστ"
                },
                {
                    "quantity": 0,
                    "name": "Κέικ"
                }
            ]
            }, (err, store) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέο κατάστημα!");
                }
            });
            
            Store.create({
                name: "CoffeeParadiso Αγίου Ανδρέου",
                address: "Αγίου Ανδρέου 142, Πάτρα 262 21, Ελλάδα",
                phoneNumber: "2610-430002",
                manager: {
                    username: "manager2@ceid.upatras.gr",
                    password: "manager2",
                    name: "ΓΕΩΡΓΙΟΣ",
                    surname: "ΤΣΕΝΤΑΡΙΟΣ",
                    AFM: "1234567891",
                    AMKA: "02019623654",
                    IBAN: "GR4648923784034423478422902"
                },
                location: {
                    lat: 38.24618,
                    lng: 21.73163
                },
                "product": [
                    {
                        "quantity": 0,
                        "name": "Τυρόπιτα"
                    },
                    {
                        "quantity": 0,
                        "name": "Χορτόπιτα"
                    },
                    {
                        "quantity": 0,
                        "name": "Κουλούρι"
                    },
                    {
                        "quantity": 0,
                        "name": "Τοστ"
                    },
                    {
                        "quantity": 0,
                        "name": "Κέικ"
                    }
                ]
            }, (err, store) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέο κατάστημα!");
                }
            });
            
            Store.create({
                name: "CoffeeParadiso Βενιζέλου",
                address: "Ελ. Βενιζέλου 75, Πάτρα 262 22, Ελλάδα",
                phoneNumber: "2610-430003",
                manager: {
                    username: "manager3@ceid.upatras.gr",
                    password: "manager3",
                    name: "ΓΕΩΡΓΙΟΣ",
                    surname: "ΚΕΜΠΑΠΙΟΣ",
                    AFM: "1234567892",
                    AMKA: "03019623654",
                    IBAN: "GR4648923784034423478422903"
                },
                location: {
                    lat: 38.23273,
                    lng: 21.73142
                },
                "product": [
                    {
                        "quantity": 0,
                        "name": "Τυρόπιτα"
                    },
                    {
                        "quantity": 0,
                        "name": "Χορτόπιτα"
                    },
                    {
                        "quantity": 0,
                        "name": "Κουλούρι"
                    },
                    {
                        "quantity": 0,
                        "name": "Τοστ"
                    },
                    {
                        "quantity": 0,
                        "name": "Κέικ"
                    }
                ]
            }, (err, store) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέο κατάστημα!");
                }
            });
            
            Store.create({
                name: "CoffeeParadiso Μαρούδα",
                address: "Πλ. Γιαννιά 13, Πάτρα 263 31, Ελλάδα",
                phoneNumber: "2610-430004",
                manager: {
                    username: "manager4@ceid.upatras.gr",
                    password: "manager4",
                    name: "ΓΕΩΡΓΙΟΣ",
                    surname: "ΦΡΑΝΚΦΟΥΡΤΙΟΣ",
                    AFM: "1234567893",
                    AMKA: "04019623654",
                    IBAN: "GR4648923784034423478422904"
                },
                location: {
                    lat: 38.23832,
                    lng: 21.74435
                },
                "product": [
                    {
                        "quantity": 0,
                        "name": "Τυρόπιτα"
                    },
                    {
                        "quantity": 0,
                        "name": "Χορτόπιτα"
                    },
                    {
                        "quantity": 0,
                        "name": "Κουλούρι"
                    },
                    {
                        "quantity": 0,
                        "name": "Τοστ"
                    },
                    {
                        "quantity": 0,
                        "name": "Κέικ"
                    }
                ]
            }, (err, store) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέο κατάστημα!");
                }
            });
            
            Store.create({
                name: "CoffeeParadiso Πανεπιστήμιο",
                address: "Πανεπιστημιούπολη Πατρών 265 04, Ελλάδα",
                phoneNumber: "2610-430005",
                manager: {
                    username: "manager5@ceid.upatras.gr",
                    password: "manager5",
                    name: "ΓΕΩΡΓΙΟΣ",
                    surname: "ΓΥΡΟΣΚΟΤΟΠΟΥΛΟΣ",
                    AFM: "1234567894",
                    AMKA: "05019623654",
                    IBAN: "GR4648923784034423478422905"
                },
                location: {
                    lat: 38.28501,
                    lng: 21.78776
                },
                "product": [
                    {
                        "quantity": 0,
                        "name": "Τυρόπιτα"
                    },
                    {
                        "quantity": 0,
                        "name": "Χορτόπιτα"
                    },
                    {
                        "quantity": 0,
                        "name": "Κουλούρι"
                    },
                    {
                        "quantity": 0,
                        "name": "Τοστ"
                    },
                    {
                        "quantity": 0,
                        "name": "Κέικ"
                    }
                ]
            }, (err, store) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέο κατάστημα!");
                }
            });
            
            Store.create({
                name: "CoffeeParadiso Πλατεία Γεωργίου",
                address: "Πλ. Γεωρ. Α 16, Πάτρα 262 21, Ελλάδα",
                phoneNumber: "2610-430006",
                manager: {
                    username: "manager6@ceid.upatras.gr",
                    password: "manager6",
                    name: "ΓΕΩΡΓΙΟΣ",
                    surname: "ΜΠΑΦΑΛΟΣ",
                    AFM: "1234567895",
                    AMKA: "06019623654",
                    IBAN: "GR4648923784034423478422906"
                },
                location: {
                    lat: 38.24609,
                    lng: 21.7348
                },
                "product": [
                    {
                        "quantity": 0,
                        "name": "Τυρόπιτα"
                    },
                    {
                        "quantity": 0,
                        "name": "Χορτόπιτα"
                    },
                    {
                        "quantity": 0,
                        "name": "Κουλούρι"
                    },
                    {
                        "quantity": 0,
                        "name": "Τοστ"
                    },
                    {
                        "quantity": 0,
                        "name": "Κέικ"
                    }
                ]
            }, (err, store) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέο κατάστημα!");
                }
            });
            
            Store.create({
                name: "CoffeeParadiso Ρήγα Φεραίου",
                address: "Ρήγα Φεραίου 91, Πάτρα 262 21, Ελλάδα",
                phoneNumber: "2610-430007",
                manager: {
                    username: "manager7@ceid.upatras.gr",
                    password: "manager7",
                    name: "ΓΕΩΡΓΙΟΣ",
                    surname: "ΜΑΚΕΝΤΣΙΖ",
                    AFM: "1234567896",
                    AMKA: "07019623654",
                    IBAN: "GR4648923784034423478422907"
                },
                location: {
                    lat: 38.24761,
                    lng: 21.7347
                },
                "product": [
                    {
                        "quantity": 0,
                        "name": "Τυρόπιτα"
                    },
                    {
                        "quantity": 0,
                        "name": "Χορτόπιτα"
                    },
                    {
                        "quantity": 0,
                        "name": "Κουλούρι"
                    },
                    {
                        "quantity": 0,
                        "name": "Τοστ"
                    },
                    {
                        "quantity": 0,
                        "name": "Κέικ"
                    }
                ]
            }, (err, store) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέο κατάστημα!");
                }
            });
            
            Store.create({
                name: "CoffeeParadiso ΤΕΙ",
                address: "Καλαβρύτων 203, Πάτρα 263 34, Ελλάδα",
                phoneNumber: "2610-430008",
                manager: {
                    username: "manager8@ceid.upatras.gr",
                    password: "manager8",
                    name: "ΓΕΩΡΓΙΟΣ",
                    surname: "ΜΠΑΡΜΠΕΚΙΟΥΣ",
                    AFM: "1234567897",
                    AMKA: "08019623654",
                    IBAN: "GR4648923784034423478422908"
                },
                location: {
                    lat: 38.22,
                    lng: 21.74563
                },
                "product": [
                    {
                        "quantity": 0,
                        "name": "Τυρόπιτα"
                    },
                    {
                        "quantity": 0,
                        "name": "Χορτόπιτα"
                    },
                    {
                        "quantity": 0,
                        "name": "Κουλούρι"
                    },
                    {
                        "quantity": 0,
                        "name": "Τοστ"
                    },
                    {
                        "quantity": 0,
                        "name": "Κέικ"
                    }
                ]
            }, (err, store) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέο κατάστημα!");
                }
            });
            
            Store.create({
                name: "CoffeeParadiso Τριών Ναυάρχων",
                address: "Κορίνθου 372, Πάτρα 262 22, Ελλάδα",
                phoneNumber: "2610-430009",
                manager: {
                    username: "manager9@ceid.upatras.gr",
                    password: "manager9",
                    name: "ΓΕΩΡΓΙΟΣ",
                    surname: "ΑΛΛΑΝΤΙΚΟΣ",
                    AFM: "1234567898",
                    AMKA: "09019623654",
                    IBAN: "GR4648923784034423478422909"
                },
                location: {
                    lat: 38.24227,
                    lng: 21.73064
                },
                "product": [
                    {
                        "quantity": 0,
                        "name": "Τυρόπιτα"
                    },
                    {
                        "quantity": 0,
                        "name": "Χορτόπιτα"
                    },
                    {
                        "quantity": 0,
                        "name": "Κουλούρι"
                    },
                    {
                        "quantity": 0,
                        "name": "Τοστ"
                    },
                    {
                        "quantity": 0,
                        "name": "Κέικ"
                    }
                ]
            }, (err, store) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέο κατάστημα!");
                }
            });
            
            Store.create({
                name: "CoffeeParadiso Ψηλαλώνια",
                address: "Πλ. Υψηλών Αλωνίων 19, Πάτρα 262 24, Ελλάδα",
                phoneNumber: "2610-430010",
                manager: {
                    username: "manager10@ceid.upatras.gr",
                    password: "manager10",
                    name: "ΓΕΩΡΓΙΟΣ",
                    surname: "ΜΠΡΙΖΟΛΙΟΣ",
                    AFM: "1234567899",
                    AMKA: "10019623654",
                    IBAN: "GR4648923784034423478422910"
                },
                location: {
                    lat: 38.24053,
                    lng: 21.73476
                },
                "product": [
                    {
                        "quantity": 0,
                        "name": "Τυρόπιτα"
                    },
                    {
                        "quantity": 0,
                        "name": "Χορτόπιτα"
                    },
                    {
                        "quantity": 0,
                        "name": "Κουλούρι"
                    },
                    {
                        "quantity": 0,
                        "name": "Τοστ"
                    },
                    {
                        "quantity": 0,
                        "name": "Κέικ"
                    }
                ]
            }, (err, store) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("Δημιουργήθηκε νέο κατάστημα!");
                }
            });
            
        }
    });
    Product.remove({}, function(err){
        if(err){ console.log(err); }
        else {
            Product.create({
                type: "drink",
                name: "Ελληνικός",
                image: "/assets/img/store/ellinikos.jpg",
                price: 1.40,
                desc: "Filter, as, cream, foam variety frappuccino café au lait percolator. Macchiato cortado foam, beans cultivar crema ut blue mountain ut filter. Aroma grounds cultivar crema percolator froth redeye qui cappuccino. Cup dark, java extra decaffeinated extraction irish organic.",
                }, (err, product) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Δημιουργήθηκε νέο προϊόν!");
                    }
                });
                
                Product.create({
                    type: "food",
                    name: "Τυρόπιτα",
                    image: "/assets/img/store/turopita.jpg",
                    price: 1.50,
                    desc: "I love cheese, especially cheese slices ricotta. Dolcelatte the big cheese hard cheese stilton macaroni cheese mascarpone queso bavarian bergkase. Cheese and wine rubber cheese cheesy feet cheddar fondue rubber cheese.",
                }, (err, product) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Δημιουργήθηκε νέο προϊόν!");
                    }
                });
                
                Product.create({
                    type: "drink",
                    name: "Φραπέ",
                    image: "/assets/img/store/frape.jpg",
                    price: 1.20,
                    desc: "Acerbic percolator, cinnamon, macchiato to go foam beans caffeine foam iced. Americano ristretto, doppio variety est affogato grinder aroma plunger pot. Sweet aroma aftertaste arabica froth, barista saucer that half and half instant.",
                }, (err, product) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Δημιουργήθηκε νέο προϊόν!");
                    }
                });
                
                Product.create({
                    type: "food",
                    name: "Χορτόπιτα",
                    image: "/assets/img/store/xortopita.jpg",
                    price: 1.90,
                    desc: "Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.",
                }, (err, product) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Δημιουργήθηκε νέο προϊόν!");
                    }
                });
                
                Product.create({
                    type: "drink",
                    name: "Εσπρέσο",
                    image: "/assets/img/store/espresso.jpg",
                    price: 1.20,
                    desc: "Trifecta rich sweet single origin white, carajillo dark french press single shot café au lait. Blue mountain barista, in aged americano organic as dripper grinder. Cinnamon cream instant and spoon, macchiato, ristretto cup irish java skinny cortado.",
                }, (err, product) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Δημιουργήθηκε νέο προϊόν!");
                    }
                });
                
                Product.create({
                    type: "food",
                    name: "Κουλούρι",
                    image: "/assets/img/store/koulouri.jpg",
                    price: 0.50,
                    desc: "Normally, both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you. But I can't give you this case, it don't belong to me. Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass.",
                }, (err, product) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Δημιουργήθηκε νέο προϊόν!");
                    }
                });
                
                Product.create({
                    type: "drink",
                    name: "Καπουτσίνο",
                    image: "/assets/img/store/capuccino.jpg",
                    price: 1.80,
                    desc: "Chicory turkish aged percolator con panna body seasonal, froth variety whipped ut irish. Frappuccino white chicory foam caramelization robusta lungo rich. Caramelization, roast, frappuccino, shop that trifecta milk coffee.",
                }, (err, product) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Δημιουργήθηκε νέο προϊόν!");
                    }
                });
                
                Product.create({
                    type: "food",
                    name: "Τοστ",
                    image: "/assets/img/store/tost.jpg",
                    price: 1.00,
                    desc: "Spicy jalapeno bacon ipsum dolor amet short loin ut beef tail. Salami ground round kielbasa, mollit aliquip velit et filet mignon tenderloin culpa ut fugiat spare ribs proident. Ball tip bacon bresaola quis culpa frankfurter proident deserunt sunt. Consectetur shoulder incididunt voluptate fatback swine frankfurter beef ribs.",
                }, (err, product) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Δημιουργήθηκε νέο προϊόν!");
                    }
                });
                
                Product.create({
                    type: "drink",
                    name: "Φίλτρου",
                    image: "/assets/img/store/filtrou.jpg",
                    price: 1.40,
                    desc: "White est arabica viennese, froth java, variety organic percolator cinnamon instant siphon. Espresso variety percolator, that caramelization mazagran seasonal mazagran body robust. Americano mug grinder, to go, irish foam french press plunger pot robusta medium. Eu est viennese bar doppio whipped strong. Carajillo brewed organic to go, grinder whipped blue mountain filter steamed.",
                }, (err, product) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Δημιουργήθηκε νέο προϊόν!");
                    }
                });
                
                Product.create({
                    type: "food",
                    name: "Κέικ",
                    image: "/assets/img/store/cake.jpg",
                    price: 1.60,
                    desc: "Cat ipsum dolor sit amet, present belly, scratch hand when stroked. Gate keepers of hell. Make muffins lounge in doorway yet purr when being pet. Brown cats with pink ears stand in front of the computer screen, so hide from vacuum cleaner shake treat bag. Lick human with sandpaper tongue. Find something else more interesting knock over christmas tree.",
                }, (err, product) => {
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Δημιουργήθηκε νέο προϊόν!");
                    }
                });
        }
    });
    Deliveryman.remove({}, function(err){
        if(err){ console.log(err); }
        else {
            
            //Deliveryman
            Deliveryman.create({
            username: "delivery1@ceid.upatras.gr",
            password: "delivery1",
            name: "ΧΑΡΑΛΑΜΠΟΣ",
            surname: "ΤΣΕΝΤΑΡΙΟΣ",
            AFM: "2345678910",
            AMKA: "01029623654",
            IBAN: "GR4648923784034423478422801",
            active: false,
            available: false,
            location: {
                    lat: 38.2489936,
                    lng: 21.6755654
            },
            hours: []
            }, (err, man) => {
                if(err){
                    console.log(err);
                }
            });
            
            Deliveryman.create({
                username: "delivery2@ceid.upatras.gr",
                password: "delivery2",
                name: "ΧΑΡΑΛΑΜΠΟΣ",
                surname: "ΦΕΤΑΣ",
                AFM: "2345678911",
                AMKA: "02029623654",
                IBAN: "GR4648923784034423478422802",
                active: false,
                available: false,
                location: {
                        lat: 38.2489936,
                        lng: 21.6755654
                },
                hours: []
            }, (err, man) => {
                if(err){
                    console.log(err);
                }
            });
            
            Deliveryman.create({
                username: "delivery3@ceid.upatras.gr",
                password: "delivery3",
                name: "ΧΑΡΑΛΑΜΠΟΣ",
                surname: "ΤΕΛΕΜΕΣ",
                AFM: "2345678912",
                AMKA: "03029623654",
                IBAN: "GR4648923784034423478422803",
                active: false,
                available: false,
                location: {
                        lat: 38.2489936,
                        lng: 21.6755654
                },
                hours: []
            }, (err, man) => {
                if(err){
                    console.log(err);
                }
            });
            
            Deliveryman.create({
                username: "delivery4@ceid.upatras.gr",
                password: "delivery4",
                name: "ΧΑΡΑΛΑΜΠΟΣ",
                surname: "ΞΙΝΟΜΥΖΗΘΡΑΣ",
                AFM: "2345678913",
                AMKA: "04029623654",
                IBAN: "GR4648923784034423478422804",
                active: false,
                available: false,
                location: {
                        lat: 38.2489936,
                        lng: 21.6755654
                },
                hours: []
            }, (err, man) => {
                if(err){
                    console.log(err);
                }
            });
            
            Deliveryman.create({
                username: "delivery5@ceid.upatras.gr",
                password: "delivery5",
                name: "ΧΑΡΑΛΑΜΠΟΣ",
                surname: "ΚΟΠΑΝΙΣΤΟΣ",
                AFM: "2345678914",
                AMKA: "05029623654",
                IBAN: "GR4648923784034423478422805",
                active: false,
                available: false,
                location: {
                        lat: 38.2489936,
                        lng: 21.6755654
                },
                hours: []
            }, (err, man) => {
                if(err){
                    console.log(err);
                }
            });
            
            Deliveryman.create({
                username: "delivery6@ceid.upatras.gr",
                password: "delivery6",
                name: "ΧΑΡΑΛΑΜΠΟΣ",
                surname: "ΓΡΑΒΙΕΡΑΣ",
                AFM: "2345678915",
                AMKA: "06029623654",
                IBAN: "GR4648923784034423478422806",
                active: false,
                available: false,
                location: {
                        lat: 38.2489936,
                        lng: 21.6755654
                },
                hours: []
            }, (err, man) => {
                if(err){
                    console.log(err);
                }
            });
            
            Deliveryman.create({
                username: "delivery7@ceid.upatras.gr",
                password: "delivery7",
                name: "ΧΑΡΑΛΑΜΠΟΣ",
                surname: "ΚΕΦΑΛΟΓΡΑΒΙΕΡΑΣ",
                AFM: "2345678916",
                AMKA: "07029623654",
                IBAN: "GR4648923784034423478422807",
                active: false,
                available: false,
                location: {
                        lat: 38.2489936,
                        lng: 21.6755654
                },
                hours: []
            }, (err, man) => {
                if(err){
                    console.log(err);
                }
            });
            
            Deliveryman.create({
                username: "delivery8@ceid.upatras.gr",
                password: "delivery8",
                name: "ΧΑΡΑΛΑΜΠΟΣ",
                surname: "ΚΑΣΕΡΗΣ",
                AFM: "2345678917",
                AMKA: "08029623654",
                IBAN: "GR4648923784034423478422808",
                active: false,
                available: false,
                location: {
                        lat: 38.2489936,
                        lng: 21.6755654
                },
                hours: []
            }, (err, man) => {
                if(err){
                    console.log(err);
                }
            });
            
            Deliveryman.create({
                username: "delivery9@ceid.upatras.gr",
                password: "delivery9",
                name: "ΧΑΡΑΛΑΜΠΟΣ",
                surname: "ΓΚΟΥΝΤΑΣ",
                AFM: "2345678918",
                AMKA: "09029623654",
                IBAN: "GR4648923784034423478422809",
                active: false,
                available: false,
                location: {
                        lat: 38.2489936,
                        lng: 21.6755654
                },
                hours: []
            }, (err, man) => {
                if(err){
                    console.log(err);
                }
            });
            
            Deliveryman.create({
                username: "delivery10@ceid.upatras.gr",
                password: "delivery10",
                name: "ΧΑΡΑΛΑΜΠΟΣ",
                surname: "ΜΟΤΣΑΡΕΛΑΣ",
                AFM: "2345678919",
                AMKA: "10029623654",
                IBAN: "GR4648923784034423478422810",
                active: false,
                available: false,
                location: {
                        lat: 38.2489936,
                        lng: 21.6755654
                },
                hours: []
            }, (err, man) => {
                if(err){
                    console.log(err);
                }
            });
            
            Deliveryman.create({
                username: "delivery11@ceid.upatras.gr",
                password: "delivery11",
                name: "ΧΑΡΑΛΑΜΠΟΣ",
                surname: "ΠΑΡΜΕΖΑΝΑΣ",
                AFM: "3456789120",
                AMKA: "01039623654",
                IBAN: "GR4648923784034423478422701",
                active: false,
                available: false,
                location: {
                        lat: 38.2489936,
                        lng: 21.6755654
                },
                hours: []
            }, (err, man) => {
                if(err){
                    console.log(err);
                }
            });
            
            Deliveryman.create({
                username: "delivery12@ceid.upatras.gr",
                password: "delivery12",
                name: "ΧΑΡΑΛΑΜΠΟΣ",
                surname: "ΡΟΚΦΟΡΗΣ",
                AFM: "3456789121",
                AMKA: "02039623654",
                IBAN: "GR4648923784034423478422702",
                active: false,
                available: false,
                location: {
                        lat: 38.2489936,
                        lng: 21.6755654
                },
                hours: []
            }, (err, man) => {
                if(err){
                    console.log(err);
                }
            });
            
            Deliveryman.create({
                username: "delivery13@ceid.upatras.gr",
                password: "delivery13",
                name: "ΧΑΡΑΛΑΜΠΟΣ",
                surname: "ΠΕΚΟΡΙΝΟΣ",
                AFM: "3456789122",
                AMKA: "03039623654",
                IBAN: "GR4648923784034423478422703",
                active: false,
                available: false,
                location: {
                        lat: 38.2489936,
                        lng: 21.6755654
                },
                hours: []
            }, (err, man) => {
                if(err){
                    console.log(err);
                }
            });
            
            Deliveryman.create({
                username: "delivery14@ceid.upatras.gr",
                password: "delivery14",
                name: "ΧΑΡΑΛΑΜΠΟΣ",
                surname: "ΜΕΤΣΟΒΟΝΙΟΣ",
                AFM: "3456789123",
                AMKA: "04039623654",
                IBAN: "GR4648923784034423478422704",
                active: false,
                available: false,
                location: {
                        lat: 38.2489936,
                        lng: 21.6755654
                },
                hours: []
            }, (err, man) => {
                if(err){
                    console.log(err);
                }
            });
            
            Deliveryman.create({
                username: "delivery15@ceid.upatras.gr",
                password: "delivery15",
                name: "ΧΑΡΑΛΑΜΠΟΣ",
                surname: "ΑΚΑΠΕΛΑΣ",
                AFM: "3456789124",
                AMKA: "05039623654",
                IBAN: "GR4648923784034423478422705",
                active: false,
                available: false,
                location: {
                        lat: 38.2489936,
                        lng: 21.6755654
                },
                hours: []
            }, (err, man) => {
                if(err){
                    console.log(err);
                }
            });
            
            Deliveryman.create({
                username: "delivery16@ceid.upatras.gr",
                password: "delivery16",
                name: "ΧΑΡΑΛΑΜΠΟΣ",
                surname: "ΤΣΙΖΜΠΕΡΓΚΕΡΙΟΣ",
                AFM: "3456789125",
                AMKA: "06039623654",
                IBAN: "GR4648923784034423478422706",
                active: false,
                available: false,
                location: {
                        lat: 38.2489936,
                        lng: 21.6755654
                },
                hours: []
            }, (err, man) => {
                if(err){
                    console.log(err);
                }
            });
            
            Deliveryman.create({
                username: "delivery17@ceid.upatras.gr",
                password: "delivery17",
                name: "ΧΑΡΑΛΑΜΠΟΣ",
                surname: "ΤΕΣΣΑΡΩΝΕΠΟΧΙΑΚΟΣ",
                AFM: "3456789126",
                AMKA: "07039623654",
                IBAN: "GR4648923784034423478422707",
                active: false,
                available: false,
                location: {
                        lat: 38.2489936,
                        lng: 21.6755654
                },
                hours: []
            }, (err, man) => {
                if(err){
                    console.log(err);
                }
            });
            
            Deliveryman.create({
                username: "delivery18@ceid.upatras.gr",
                password: "delivery18",
                name: "ΧΑΡΑΛΑΜΠΟΣ",
                surname: "ΒΙΣΩΝΟΤΥΡΟΣ",
                AFM: "3456789127",
                AMKA: "08039623654",
                IBAN: "GR4648923784034423478422708",
                active: false,
                available: false,
                location: {
                        lat: 38.2489936,
                        lng: 21.6755654
                },
                hours: []
            }, (err, man) => {
                if(err){
                    console.log(err);
                }
            });
            
            Deliveryman.create({
                username: "delivery19@ceid.upatras.gr",
                password: "delivery19",
                name: "ΧΑΡΑΛΑΜΠΟΣ",
                surname: "ΕΛΒΕΤΙΚΟΣ",
                AFM: "3456789128",
                AMKA: "09039623654",
                IBAN: "GR4648923784034423478422709",
                active: false,
                available: false,
                location: {
                        lat: 38.2489936,
                        lng: 21.6755654
                },
                hours: []
            }, (err, man) => {
                if(err){
                    console.log(err);
                }
            });
            
            Deliveryman.create({
                username: "delivery20@ceid.upatras.gr",
                password: "delivery20",
                name: "ΧΑΡΑΛΑΜΠΟΣ",
                surname: "ΧΑΛΟΥΜΗΣ",
                AFM: "3456789129",
                AMKA: "10039623654",
                IBAN: "GR4648923784034423478422710",
                active: false,
                available: false,
                location: {
                        lat: 38.2489936,
                        lng: 21.6755654
                },
                hours: []
            }, (err, man) => {
                if(err){
                    console.log(err);
                }
            });
            
        }
    });
    Order.remove({}, function(err){
        if(err){ console.log(err); }
    });
    
}

module.exports = seedDB;