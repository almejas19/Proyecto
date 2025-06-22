const prompt = require('prompt-sync')();
const User = require('../config/user');
const Historial = require('../config/historial');

// Función para evaluar expresiones aritméticas
function evaluarExpresionAritmetica(expresion) {
  try {
    const tokens = expresion.trim().split(" ");
    let resultado = parseFloat(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
      const operador = tokens[i].toUpperCase();
      const siguienteNumero = parseFloat(tokens[i + 1]);

      switch (operador) {
        case "SUMA":
          resultado += siguienteNumero;
          break;
        case "RESTA":
          resultado -= siguienteNumero;
          break;
        case "MULTIPLICA":
          resultado *= siguienteNumero;
          break;
        case "DIVIDE":
          resultado /= siguienteNumero;
          break;
        case "POTENCIA":
          resultado = Math.pow(resultado, siguienteNumero);
          break;
        default:
          return "❌ Operador no válido. Usa SUMA, RESTA, MULTIPLICA, DIVIDE o POTENCIA.";
      }
    }

    return resultado;
  } catch (err) {
    return "❌ Error al evaluar la expresión.";
  }
}

// Evaluar expresiones booleanas (true and false or true)
function evaluarExpresionBooleana(expresion) {
  try {
    const tokens = expresion.trim().toLowerCase().split(" ");
    let resultado = tokens[0] === "true";

    for (let i = 1; i < tokens.length; i += 2) {
      const operador = tokens[i];
      const siguienteValor = tokens[i + 1] === "true";

      switch (operador) {
        case "and":
          resultado = resultado && siguienteValor;
          break;
        case "or":
          resultado = resultado || siguienteValor;
          break;
        default:
          return "❌ Operador booleano no válido. Usa 'and' o 'or'.";
      }
    }

    return resultado;
  } catch (err) {
    return "❌ Error al evaluar expresión booleana.";
  }
}

// 🧠 Lógica de ejecución
async function ejecutarOperaciones(usuario) {
  console.log("\n🧮 Bienvenido al sistema de operaciones.");
  const tipo = usuario.tipo.toLowerCase();

  const permisos = {
    admin:    { aritmetica: true, booleana: true,  limite: Infinity },
    estandar: { aritmetica: true, booleana: false, limite: 10 },
    invitado: { aritmetica: true, booleana: false, limite: 3 }
  };

  const rol = permisos[tipo];
  let operacionesRestantes = Number(usuario.operaciones_restantes);
  if (isNaN(operacionesRestantes)) operacionesRestantes = 0;

  if (tipo !== 'admin') {
    console.log(`📌 Operaciones restantes disponibles: ${operacionesRestantes}`);
  }

  while (true) {
    if (tipo !== 'admin' && operacionesRestantes <= 0) {
      console.log("❌ Has alcanzado tu límite de operaciones.");
      if (tipo === 'estandar') {
        console.log("💳 Suscripción activa: $3.99/mes. Límite: 10 operaciones diarias.");
      } else if (tipo === 'invitado') {
        console.log("🎫 Modo invitado: 3 operaciones permitidas.");
      }
      break;
    }

    const opcion = prompt("¿Qué deseas hacer? (aritmetica/booleana/exit): ").toLowerCase();
    if (opcion === 'exit') break;

    if (opcion === 'aritmetica' && rol.aritmetica) {
      const expresion = prompt("🧮 Escribe tu expresión (ej: 2 POTENCIA 3 o 5 SUMA 4): ");
      const resultado = evaluarExpresionAritmetica(expresion);

      if (typeof resultado === 'string' && resultado.startsWith("❌")) {
        console.log(resultado);
        continue;
      }

      console.log("✅ Resultado:", resultado);

      await Historial.create({
        usuario_id: usuario.id,
        expresion,
        resultado: resultado.toString(),
        tipo_operacion: "aritmetica",
        operaciones_restantes_al_momento: operacionesRestantes
      });

      if (tipo !== 'admin') {
        operacionesRestantes--;
        await User.update(
          { operaciones_restantes: operacionesRestantes },
          { where: { id: usuario.id } }
        );
        console.log(`📌 Operaciones restantes: ${operacionesRestantes}`);
      }

    } else if (opcion === 'booleana' && rol.booleana) {
      const expresion = prompt("🔎 Escribe tu expresión (ej: true and false or true): ");
      const resultado = evaluarExpresionBooleana(expresion);

      if (typeof resultado === 'string' && resultado.startsWith("❌")) {
        console.log(resultado);
        continue;
      }

      console.log("✅ Resultado:", resultado);

      await Historial.create({
        usuario_id: usuario.id,
        expresion,
        resultado: resultado.toString(),
        tipo_operacion: "booleana",
        operaciones_restantes_al_momento: operacionesRestantes
      });

      if (tipo !== 'admin') {
        operacionesRestantes--;
        await User.update(
          { operaciones_restantes: operacionesRestantes },
          { where: { id: usuario.id } }
        );
        console.log(`📌 Operaciones restantes: ${operacionesRestantes}`);
      }

    } else {
      console.log("🚫 No tienes permiso para ese tipo de operación.");
    }
  }

  console.log("👋 Has salido del sistema.");
}

module.exports = { ejecutarOperaciones };
