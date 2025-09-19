import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SOURCE_FOLDER = path.join(__dirname, '../src/resources/Tatikati_Press_Kit');
const OUTPUT_PATH = path.join(__dirname, '../public/Tatikati_Press_Kit.zip');

// Créer le dossier public s'il n'existe pas
const outputDir = path.dirname(OUTPUT_PATH);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Créer le fichier ZIP
const output = fs.createWriteStream(OUTPUT_PATH);
const archive = archiver('zip', {
  zlib: { level: 9 } // Compression maximale
});

output.on('close', () => {
  console.log(`✅ Press Kit ZIP créé : ${OUTPUT_PATH}`);
  console.log(`📦 Taille : ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
});

archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.warn('⚠️ Avertissement:', err);
  } else {
    throw err;
  }
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

// Vérifier que le dossier source existe
if (!fs.existsSync(SOURCE_FOLDER)) {
  console.error(`❌ Le dossier Press Kit n'existe pas : ${SOURCE_FOLDER}`);
  console.log('📝 Créez le dossier src/resources/Tatikati_Press_Kit et ajoutez-y vos fichiers.');
  process.exit(1);
}

// Ajouter le contenu en conservant le nom du dossier dans le ZIP
archive.directory(SOURCE_FOLDER, 'Tatikati_Press_Kit');

archive.finalize();