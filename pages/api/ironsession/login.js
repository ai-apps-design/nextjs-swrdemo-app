import { Octokit } from "octokit";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "/libs/ironsession/session";
const octokit = new Octokit();

console.log('api/ironsession/event route sessionOptions :', sessionOptions);

export default withIronSessionApiRoute(async (req, res) => {
  //console.log('api/ironession/login route req :', req);

  const { username } = await req.body;

  console.log('api/ironession/login route req :', JSON.stringify(username));

  try {
    const {
      data: { login, avatar_url },
    } = await octokit.rest.users.getByUsername({ username });

    const user = { isLoggedIn: true, login, avatarUrl: avatar_url };
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);
