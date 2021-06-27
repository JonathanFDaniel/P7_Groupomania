module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("messages", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key:'id'
            }
        },    
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        attachement: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        likes: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        alert: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
  
    return Message;
  };