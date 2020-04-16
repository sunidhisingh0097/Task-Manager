const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/task.db'
})

const Tasks = db.define('task', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    description: {
        type: Sequelize.BOOLEAN
    },
    due_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 0                     // 0--> incomplete and 1--> completed
    },
    priority: {
        type: Sequelize.INTEGER            
    },
})

const Notes = db.define('notes',{
    noteId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    note: {
        type: Sequelize.STRING,
    },
    taskId: {
        type: Sequelize.INTEGER
    }
})

Tasks.hasMany(Notes, {foreignKey: 'taskId'})
Notes.belongsTo(Tasks)

module.exports = {
    db, Tasks, Notes
}