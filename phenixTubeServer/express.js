const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');
const { type } = require('os');
app.use(cors({
    origin: ['http://localhost:4200'],  // Frontend autorisé
    methods: ['GET', 'POST'],  // Méthodes autorisées
    allowedHeaders: ['Content-Type', 'Authorization']  // En-têtes autorisés
}));
const PORT = 3001;



// Spécifiez le dossier des vidéos
const clipFolder = path.join(__dirname, 'clip');
const filmFolder = path.join(__dirname, 'film')
app.get('/api/film', (req, res) =>{
    fs.readdir(filmFolder, (err, file) =>{
        if(err){
            return res.status(500).json({ error: 'Impossible de lire le dossier' });
        }
        const filmFiles = file.filter(file =>{
            const ext = path.extname(file).toLocaleLowerCase();
            return ['.mp4', '.webm', '.mov', '.mkv'].includes(ext); // Ajoutez d'autres extensions si nécessaire
        })
        const Films = filmFiles.map((file, index)=>({
            id: index + 1,
            name: file,
            type:"film",
            path: `http://localhost:3001/film/${file}`
        }))
        res.json(Films)
    })
})
// Route pour lister les vidéos
app.get('/api/clip', (req, res) => {
    fs.readdir(clipFolder, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Impossible de lire le dossier' });
        }

        // Filtrer pour ne garder que les fichiers vidéo
        const clipFolder = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.mp4', '.webm', '.mov', '.mkv'].includes(ext); // Ajoutez d'autres extensions si nécessaire
        });

        // Créer un tableau JSON contenant les chemins complets ou les noms des vidéos
        const clips = clipFolder.map((file, index) => ({
            id: index + 1,
            name: file,
            type:"clip",
            path: `http://localhost:3001/clip/${file}`
        }));

        // Retourner les vidéos sous forme de JSON
        res.json(clips);
    });
});

app.use('/clip', express.static(clipFolder));
app.use('/film',express.static(filmFolder))
// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
