const express = require("express");
const router = express.Router();
const admin = require("./firebaseAdmin");
const supabase = require("./supabase");

router.post("/auth/google", async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ error: "No token provided" });

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decoded;

    const { data, error } = await supabase
      .from("users")
      .upsert(
        {
          firebase_uid: uid,
          email,
          display_name: name,
          photo_url: picture,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "firebase_uid" }
      )
      .select()
      .single();

    if (error) throw error;

    console.log("✅ User saved:", email);
    res.json({ success: true, user: data });

  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(401).json({ error: err.message });
  }
});

module.exports = router;