pip install fastapi uvicorn

npx create-next-app@latest realtime-chat
cd realtime-chat
npm install
npm install isomorphic-ws

เวลา run ให้เปิด 2 terminal
terminal แรกใน folderหลัก แล้ว run
uvicorn app:app --reload

terminal ที่2 ให้ cd realtime-chat แล้ว run
npm run dev
