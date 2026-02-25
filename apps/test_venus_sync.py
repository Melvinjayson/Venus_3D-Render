import unittest
import hashlib
import time
from typing import List

# Mocking the build logic if we were to test it in isolation
# Or we can just test the actual implementation if we import it.
# Since we are in a script context, I'll copy the logic for a pure unit test of the algorithm.

def build_venus_context_seed_logic(summary: str):
    ctx_hash = hashlib.sha256(summary.encode()).hexdigest()
    seed = f"v-{ctx_hash[:10]}"
    presets = ["Nebula Drift", "Belt Run", "Deep Field"]
    preset_idx = int(ctx_hash[:8], 16) % 3
    preset = presets[preset_idx]
    p1 = f"#{ctx_hash[10:16]}"
    p2 = f"#{ctx_hash[16:22]}"
    p3 = f"#{ctx_hash[22:28]}"
    density = 0.4 + (int(ctx_hash[28:30], 16) / 255.0) * 0.5
    motions = ["calm", "active"]
    motion = motions[int(ctx_hash[30:31], 16) % 2]

    return {
        "contextHash": f"aura_{ctx_hash[:16]}",
        "seed": seed,
        "preset": preset,
        "palette": [p1, p2, p3],
        "density": round(density, 2),
        "motion": motion,
        "summary": summary[:240]
    }

class TestVenusSync(unittest.TestCase):
    def test_determinism(self):
        summary = "Testing deterministic sync."
        res1 = build_venus_context_seed_logic(summary)
        res2 = build_venus_context_seed_logic(summary)
        
        self.assertEqual(res1["contextHash"], res2["contextHash"])
        self.assertEqual(res1["seed"], res2["seed"])
        self.assertEqual(res1["preset"], res2["preset"])
        self.assertEqual(res1["palette"], res2["palette"])
        self.assertEqual(res1["density"], res2["density"])
        self.assertEqual(res1["motion"], res2["motion"])

    def test_context_change(self):
        res1 = build_venus_context_seed_logic("Context A")
        res2 = build_venus_context_seed_logic("Context B")
        
        self.assertNotEqual(res1["contextHash"], res2["contextHash"])
        self.assertNotEqual(res1["seed"], res2["seed"])

    def test_summary_truncation(self):
        long_summary = "A" * 500
        res = build_venus_context_seed_logic(long_summary)
        self.assertEqual(len(res["summary"]), 240)

if __name__ == "__main__":
    unittest.main()
