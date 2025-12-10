<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 🔥 currentUser로 변경
const user = JSON.parse(localStorage.getItem("currentUser") || "null");

const isScrolled = ref(false);
const isHidden = ref(false);
let lastScrollY = 0;

function handleScroll() {
  if (window.innerWidth > 600) {
    isHidden.value = false;
    return;
  }

  const currentY = window.scrollY;
  isScrolled.value = currentY > 20;

  if (currentY > lastScrollY && currentY > 80) {
    isHidden.value = true;
  } else {
    isHidden.value = false;
  }

  lastScrollY = currentY;
}

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

function goHome() {
  router.push("/");
}

// 🔥 currentUser 삭제
function logout() {
  localStorage.removeItem("currentUser");
  router.push("/signin");
  alert("로그아웃 되었습니다!");
}
</script>
