import { SECRET_KEY } from '$env/static/private';
import type { PageServerLoad } from './$types';
import {redirect} from "@sveltejs/kit"
import jwt from "jsonwebtoken"

export const load: PageServerLoad = async ({ cookies }) => {
  const sessionId = cookies.get('sessionid')
  if (typeof sessionId === "undefined") {
    redirect(302, '/login')
  }
  jwt.verify(sessionId, SECRET_KEY, (err, decoded) => {
    if (err) {
      redirect(302, '/login')
    }
  });
}
