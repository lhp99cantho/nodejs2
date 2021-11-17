const path = require('path');
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');

const passport = require('passport');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const LocalStrategy = require('passport-local').Strategy;
const Items = require('./app/models/Items');
const Users = require('./app/models/Users');

const app = express();
const port = 3000;

const route = require('./routes');

const pp = require('./config/passport');

//Connect DB

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// app.use(morgan('combined'))
app.use(
    session({
        secret: 'secret',
        saveUninitialized: true,
        resave: true,
    }),
);

pp.localPassport();

app.use(passport.initialize());
app.use(passport.session());

//Handle
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b, c) => a + b + c,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'fas fa-sort',
                    desc: 'fas fa-sort-numeric-down-alt',
                    asc: 'fas fa-sort-numeric-up-alt',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };
                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`;
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

//Render
route(app);

app.listen(port, () =>
    console.log(`App listening  at http://localhost:${port}`),
);
