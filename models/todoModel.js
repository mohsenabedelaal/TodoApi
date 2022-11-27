module.exports = (sequelize,DataTypes)=>{
    const Todo = sequelize.define("todo",{
        id : {
            type : DataTypes.INTEGER.UNSIGNED,
            primaryKey:true,
            autoIncrement: true
        },
        task:{
            type: DataTypes.STRING
        },
        isCompleted:{
            type: DataTypes.BOOLEAN,
            field:'is_completed',
            defaultValue:false
        }
    })
    return Todo
}