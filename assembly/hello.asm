; hello.asm — NASM + GCC Windows executable
section .data
    msg db "Welcome to Sarthak OS", 0

section .text
global main
extern printf

main:
    mov rdi, msg      ; first argument to printf
    xor eax, eax      ; clear RAX
    call printf       ; call C printf
    ret