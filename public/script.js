const { register } = require("module");

function showRegister() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
    clearErrors();
}

function showLogin() {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
    clearErrors();
}


function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

// Validação de CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    
    if (resto !== parseInt(cpf.charAt(9))) {
        return false;
    }
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    
    if (resto !== parseInt(cpf.charAt(10))) {
        return false;
    }
    
    return true;
}


function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
}


function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


function validarSenha(senha) {
    return senha.length >= 6;
}


function validarNome(nome) {
    return nome.trim().length >= 3;
}


function cadastrarUsuario() {
    clearErrors();
    
    const nome = document.getElementById('register-name').value.trim();
    const cpf = document.getElementById('register-cpf').value;
    const email = document.getElementById('register-email').value.trim();
    const senha = document.getElementById('register-password').value;
    
    let valido = true;
    
 
    if (!validarNome(nome)) {
        document.getElementById('name-error').textContent = 'Nome deve ter pelo menos 3 caracteres';
        valido = false;
    }
    
    if (!validarCPF(cpf)) {
        document.getElementById('cpf-error').textContent = 'CPF inválido';
        valido = false;
    }
    
    
    if (!validarEmail(email)) {
        document.getElementById('email-error').textContent = 'Email inválido';
        valido = false;
    }
    
    
    if (!validarSenha(senha)) {
        document.getElementById('password-error').textContent = 'Senha deve ter pelo menos 6 caracteres';
        valido = false;
    }
    
    if (!valido) {
        return;
    }
    
    
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioExistente = usuarios.find(u => u.email === email || u.cpf === cpf.replace(/\D/g, ''));
    
    if (usuarioExistente) {
        if (usuarioExistente.email === email) {
            document.getElementById('email-error').textContent = 'Email já cadastrado';
        } else {
            document.getElementById('cpf-error').textContent = 'CPF já cadastrado';
        }
        return;
    }
    
}

const usuarios = json.parse(localStorage.getItem('usuarios') || '[]')
const usuarioExistente = usuarios.find(u => u.email === email || u.cpf === cpf.replace(/\D/g, ''))

if(usuarioExistente){
    if (usuarioExistente.email === email){
        document.getElementById('email-error').textContent = 'Email já cadastrado'
    } else {
        document.getElementById('cpf-error').textContent = 'CPF já cadastrado'
    }
    return
}

usuarios.push({
    nome: nome,
    cpf: cpf.replace(/\D/g, ''),
    email: email,
    senha: senha
})

localStorage.setItem('usuarios', JSON.stringify(usuarios))
alert('Cadastro realizado com sucesso!')
showLogin()

function fazerlogin(){
    const email = document.getElementById('login-email').value.trim()
    const senha = document.getElementById('login-password').value
    clearErrors()
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
    const usuario = usuarios.find(u => u.email === email && u.senha === senha)

}

if(!usuario){
    alert('login realizado com sucesso!')

} else {
    alert('Email ou senha inválidos')

    }
document.getElementById('register-cpf').addEventListener('input', function(e){
    e.target.value = formatarCPF(e.target.value)
})

document.getElementById('register-btn').addEventListener('click', cadastrarUsuario)
document.getElementById('login-btn').addEventListener('click', fazerlogin)

document.