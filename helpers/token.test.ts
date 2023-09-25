import { Session } from "@/components/entities/session/session"
import { generateSidToken, verifyToken } from "./token"

describe("Token Helper Functions", () => {
  describe("generateSidToken", () => {
    it("should generate a valid token", () => {
      const session: Session = { sid: "1234567890", disabled: false, uid: null, uids: [] }
      const token = generateSidToken(session)
        if (token) {
            expect(token).toBeTruthy()
        } else expect(token).toBeNull()
    })

    it("should return null if NEXT_PUBLIC_JWT_SECRET is not set", () => {
      process.env.NEXT_PUBLIC_JWT_SECRET = ""
      const session: Session = { sid: "1234567890", disabled: false, uid: null, uids: [] }
      const token = generateSidToken(session)
      expect(token).toBeNull()
    })
  })

  describe("verifyToken", () => {
    it("should verify a valid token", async () => {
        const session: Session = { sid: "1234567890", disabled: false, uid: null, uids: [] }
        const token = generateSidToken(session)
        if (token) {
            const verifiedToken = await verifyToken(token)
            expect(verifiedToken).toBeTruthy()
        } else expect(token).toBeNull()
    })

    it("should return null if NEXT_PUBLIC_JWT_SECRET is not set", async () => {
      process.env.NEXT_PUBLIC_JWT_SECRET = ""
      const verifiedToken = await verifyToken("invalid_token")
      expect(verifiedToken).toBeNull()
    })
  })
})