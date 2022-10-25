import MySQLdb

db = MySQLdb.connect(
    host="localhost",
    user="dbuser",
    passwd="123",
    db="manga_first_db"
)

c = db.cursor()
data = ('Fullmetal Alchemist', 1, '2001-07-12', '2010-09-11', '!inserted from python!')
c.execute("insert into mangas (title, type , start_date, end_date, description) "
          "values (%s, %s, %s, %s, %s)", data)
db.commit()
c.close()
db.commit()