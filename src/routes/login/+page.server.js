import { SECRET_KEY } from '$env/static/private';
import { getUser } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import {  pbkdf2Sync } from 'crypto'
import jwt from "jsonwebtoken"

export const actions = {
	login: async ({cookies, request}) => {
		
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');
    const rollno = data.get('rollno');

    const passhash = pbkdf2Sync(password, email + rollno, 1000, 64, 'sha512').toString('hex');

    const user = await getUser(email);
    console.log(user)
    
    if (user) {
      if (user.passhash == passhash) {
        let token = '';
        try {
          token = jwt.sign({
            uid: user.id,
            email: user.emailid,
            roll: user.rollno
          },
          SECRET_KEY,
          {
            expiresIn: '10d'
          }
          );
        } catch (err) {
          console.log(err)
        }
        cookies.set('sessionid',token, {
          path: '/',
        });
        console.log("AUTH SUCCESS")
        redirect(302, '/')
      }
      else {
        console.log(user)
        console.log("AUTH FAILED")
        return fail(400, {
          email, incorrect: true
        })
      }
    }
    else {
      return fail(400, {
        email, notfound: true
      })
    }

    // const user = await db.getUser(email)
	},
  register: async (event) => {

  }
};
