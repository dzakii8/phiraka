import { pool } from "../configDB/pg-config";
import bcrypt from 'bcryptjs'

export class User {
  static async getAll() {
    try {
      let { rows } = await pool.query('select * from users order by createtime')
      return rows

    } catch (error) {
      console.log(error);
    }
  }
  static async getById(id) {
    try {
      let { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }

  static async login(request) {
    try {
      const { rows } = await pool.query(`select * from users where username = '${request.username}'`);
      if (rows.length == 0) {
        return 'Login gagal'
      }

      const user = rows[0]
      const compare = bcrypt.compareSync(request.password, user.password)

      if (!compare) {
        return 'Login gagal'
      }
      delete user.password
      // return user.id
      return 'Login berhasil'

    } catch (error) {
      console.log(error);
    }
  }

  static async create(user) {
    try {
      if (user.password.length > 8) {
        return 'Username terlalu panjang';
      }

      if (user.password.length < 5) {
        return 'Username terlalu pendek';
      }
      const existingUser = await pool.query(`select username from users where username = '${user.username}'`);
      if (existingUser.rows.length > 0) {
        return 'Username sudah terpakai';
      }

      user.password = bcrypt.hashSync(user.password, 10)

      let { rowCount } = await pool.query(`
        insert into users
        (username, password, createtime)
        values
        ('${user.username}','${user.password}', now())
        `)

      if (rowCount === 1) {
        return 'Berhasil menambahkan user';
      } else {
        return 'Gagal menambahkan user';
      }

    } catch (error) {
      console.log(error);
      return 'Gagal menambahkan user';
    }
  }

  static async edit(id, newUser) {
    try {

      if (newUser.password) {
        newUser.password = bcrypt.hashSync(newUser.password, 10);
      }
      console.log(id);

      const fields = Object.keys(newUser)
        .map(key => `${key} = '${newUser[key]}'`)
        .join(', ');
      console.log(fields);
      let { rowCount } = await pool.query(`
      UPDATE users
      SET ${fields}
      WHERE id = '${id}'
      `);


      if (rowCount === 1) {
        return 'Berhasil mengedit user';
      } else {
        return 'Gagal mengedit user';
      }
    } catch (error) {
      console.log(error);
      return 'Gagal mengedit user';
    }
  }

  static async delete(id) {
    try {
      let { rowCount } = await pool.query(`
        DELETE FROM users
        WHERE id = '${id}'
      `);

      if (rowCount === 1) {
        return 'Berhasil menghapus user';
      } else {
        return 'Gagal menghapus user';
      }
    } catch (error) {
      console.log(error);
      return 'Gagal menghapus user';
    }
  }

}