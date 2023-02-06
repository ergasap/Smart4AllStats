import express from 'express'
import exphbs from 'express-handlebars'
import cors from 'cors'
import path from 'path'
import {fileURLToPath} from 'url';
import routes from './routes/index.routes.js'

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors())
app.use("/static", express.static("public"));
app.use("/public", express.static(path.join(__dirname, "public")));

//handlebars helpers
var hbs = exphbs.create({});

//view engine 
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars');
app.set('views', './src/views');

//routes
app.use(routes)


//app exposure
app.listen(8080, () => console.log('Example app listening on port 8080!'))
