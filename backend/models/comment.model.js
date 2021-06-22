module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key:'id'
            }
        },  
        messageId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Messages',
                key:'id'
            }
        },  
        content: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userComment: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
  
    return Comment;
  };