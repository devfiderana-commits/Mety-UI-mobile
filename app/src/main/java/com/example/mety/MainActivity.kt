package com.example.mety

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.blur
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import coil.compose.AsyncImage
import com.example.mety.ui.theme.CardAccent
import com.example.mety.ui.theme.DarkText
import com.example.mety.ui.theme.MetyTheme
import com.example.mety.ui.theme.OliveDark
import com.example.mety.ui.theme.OliveGreen
import com.example.mety.ui.theme.Peach
import com.example.mety.ui.theme.Sand
import com.example.mety.ui.theme.SoftText
import com.example.mety.ui.theme.Terracotta

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MetyTheme {
                MetyNavigationApp()
            }
        }
    }
}

private sealed class Screen(val route: String, val label: String) {
    data object Home : Screen("home", "Home")
    data object About : Screen("about", "About Us")
    data object Menu : Screen("menu", "Menu")
    data object Contact : Screen("contact", "Contact")
}

private data class Dish(
    val name: String,
    val calories: String,
    val image: String,
    val tint: Color
)

private data class MenuItem(
    val name: String,
    val price: String,
    val description: String,
    val image: String,
    val tint: Color
)

@Composable
fun MetyNavigationApp() {
    val navController = rememberNavController()
    val screens = listOf(Screen.Home, Screen.About, Screen.Menu, Screen.Contact)
    val currentBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = currentBackStackEntry?.destination?.route ?: Screen.Home.route

    Scaffold(
        containerColor = MaterialTheme.colorScheme.background,
        topBar = {
            TopNavBar(
                currentRoute = currentRoute,
                screens = screens,
                onNavigate = { route ->
                    navController.navigate(route) {
                        popUpTo(navController.graph.findStartDestination().id) {
                            saveState = true
                        }
                        launchSingleTop = true
                        restoreState = true
                    }
                }
            )
        },
        bottomBar = {
            MetyBottomBar(navController, screens)
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Screen.Home.route,
            modifier = Modifier.padding(innerPadding)
        ) {
            composable(Screen.Home.route) { HomeScreen() }
            composable(Screen.About.route) { AboutScreen() }
            composable(Screen.Menu.route) { MenuScreen() }
            composable(Screen.Contact.route) { ContactScreen() }
        }
    }
}

@Composable
private fun TopNavBar(
    currentRoute: String,
    screens: List<Screen>,
    onNavigate: (String) -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(top = 18.dp, start = 18.dp, end = 18.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(999.dp))
                .background(Color.White.copy(alpha = 0.55f))
                .border(1.dp, Color.White.copy(alpha = 0.75f), RoundedCornerShape(999.dp))
                .padding(horizontal = 18.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = "AgroMill",
                color = DarkText,
                fontWeight = FontWeight.ExtraBold,
                fontSize = 20.sp,
                letterSpacing = 0.08.sp
            )

            Row(
                horizontalArrangement = Arrangement.spacedBy(20.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                screens.forEach { screen ->
                    val active = screen.route == currentRoute
                    Text(
                        text = screen.label,
                        color = if (active) DarkText else SoftText,
                        fontSize = 11.sp,
                        fontWeight = if (active) FontWeight.Bold else FontWeight.SemiBold,
                        letterSpacing = 0.10.sp,
                        modifier = Modifier
                            .clip(RoundedCornerShape(999.dp))
                            .background(
                                if (active) Color(0xFFF3E4D8) else Color.Transparent
                            )
                            .padding(horizontal = 8.dp, vertical = 6.dp)
                            .let {
                                if (active) it.border(1.dp, Color(0xFFDBB18A), RoundedCornerShape(999.dp)) else it
                            },
                        maxLines = 1
                    )
                }
            }

            Button(
                onClick = { onNavigate(Screen.Contact.route) },
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFD69055)),
                shape = RoundedCornerShape(999.dp),
                contentPadding = androidx.compose.foundation.layout.PaddingValues(horizontal = 18.dp, vertical = 10.dp)
            ) {
                Text(
                    text = "Book a Table",
                    fontSize = 11.sp,
                    letterSpacing = 0.09.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }
    }
}

@Composable
private fun MetyBottomBar(navController: NavHostController, items: List<Screen>) {
    val currentBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = currentBackStackEntry?.destination?.route

    NavigationBar(
        containerColor = Color.White.copy(alpha = 0.85f),
        tonalElevation = 12.dp
    ) {
        items.forEach { screen ->
            val selected = currentRoute == screen.route
            NavigationBarItem(
                selected = selected,
                onClick = {
                    navController.navigate(screen.route) {
                        popUpTo(navController.graph.findStartDestination().id) {
                            saveState = true
                        }
                        launchSingleTop = true
                        restoreState = true
                    }
                },
                icon = {
                    Text(
                        text = when (screen) {
                            Screen.Home -> "⌂"
                            Screen.About -> "✦"
                            Screen.Menu -> "☰"
                            Screen.Contact -> "✉"
                        },
                        fontSize = 16.sp,
                        color = if (selected) Color(0xFFD69055) else SoftText
                    )
                },
                label = { Text(screen.label, color = if (selected) Color(0xFFD69055) else SoftText) }
            )
        }
    }
}

@Composable
private fun HomeScreen() {
    val dishes = listOf(
        Dish("Crunchy Citrus Bowl", "420 kcal", "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80", Peach),
        Dish("Garden Glow Salad", "310 kcal", "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80", OliveGreen),
        Dish("Harvest Quinoa", "390 kcal", "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80", Terracotta),
        Dish("Sunrise Greens", "350 kcal", "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80", Sand)
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(horizontal = 20.dp, vertical = 18.dp),
        verticalArrangement = Arrangement.spacedBy(20.dp)
    ) {
        HeroSection()

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            val stats = listOf("4.9 ★" to "Average\nRating", "16 min" to "Fast\nPrep", "120+" to "Happy\nGuests")
            stats.forEach { (value, label) ->
                Card(
                    modifier = Modifier.weight(1f),
                    shape = RoundedCornerShape(22.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.7f)),
                    elevation = CardDefaults.cardElevation(defaultElevation = 0.dp)
                ) {
                    Column(
                        modifier = Modifier.padding(vertical = 18.dp),
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.Center
                    ) {
                        Text(value, fontWeight = FontWeight.Bold, color = DarkText, fontSize = 22.sp)
                        Spacer(modifier = Modifier.height(4.dp))
                        Text(label, color = SoftText, fontSize = 10.sp, lineHeight = 14.sp, textAlign = androidx.compose.ui.text.style.TextAlign.Center)
                    }
                }
            }
        }

        Text(
            text = "Featured menu",
            color = DarkText,
            fontWeight = FontWeight.Bold,
            fontSize = 26.sp
        )

        Row(
            modifier = Modifier.horizontalScroll(rememberScrollState()),
            horizontalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            dishes.forEach { dish ->
                FoodCard(dish)
            }
        }

        TestimonialCard()
    }
}

@Composable
private fun HeroSection() {
    AnimatedVisibility(
        visible = true,
        enter = fadeIn(animationSpec = tween(500)) + slideInVertically(animationSpec = tween(500), initialOffsetY = { it / 3 }),
        exit = fadeOut() + slideOutVertically(targetOffsetY = { it / 3 })
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(
                text = "SIMPLE",
                color = DarkText,
                fontWeight = FontWeight.Black,
                fontSize = 36.sp,
                letterSpacing = 0.08.sp
            )
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.Center,
                modifier = Modifier.padding(vertical = 6.dp)
            ) {
                Text("&", color = Color(0xFFD69055), fontSize = 36.sp, fontWeight = FontWeight.Black)
            }
            Text(
                text = "QUICK",
                color = DarkText,
                fontWeight = FontWeight.Black,
                fontSize = 36.sp,
                letterSpacing = 0.08.sp
            )

            Box(
                modifier = Modifier
                    .padding(top = 12.dp)
                    .size(width = 280.dp, height = 280.dp)
                    .clip(CircleShape)
                    .background(Color.White.copy(alpha = 0.2f))
                    .border(8.dp, Color.White.copy(alpha = 0.85f), CircleShape)
            ) {
                AsyncImage(
                    model = "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=80",
                    contentDescription = "Plate of food",
                    modifier = Modifier.fillMaxSize(),
                    contentScale = ContentScale.Crop
                )
            }
        }
    }
}

@Composable
private fun FoodCard(dish: Dish) {
    Card(
        modifier = Modifier.width(220.dp),
        shape = RoundedCornerShape(24.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.6f)),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp)
    ) {
        Column(modifier = Modifier.padding(bottom = 16.dp)) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 0.dp)
                    .height(88.dp)
            ) {
                Box(
                    modifier = Modifier
                        .size(92.dp)
                        .align(Alignment.TopCenter)
                        .offset(y = (-30).dp)
                        .clip(CircleShape)
                        .background(Color.White.copy(alpha = 0.8f))
                        .border(5.dp, Color.White.copy(alpha = 0.9f), CircleShape)
                ) {
                    AsyncImage(
                        model = dish.image,
                        contentDescription = dish.name,
                        modifier = Modifier.fillMaxSize(),
                        contentScale = ContentScale.Crop
                    )
                }
            }

            Column(modifier = Modifier.padding(horizontal = 18.dp)) {
                Text(dish.name, color = DarkText, fontWeight = FontWeight.Bold, fontSize = 16.sp)
                Spacer(modifier = Modifier.height(8.dp))
                Text(dish.calories, color = Color(0xFFD69055), fontSize = 11.sp, fontWeight = FontWeight.Bold, letterSpacing = 0.08.sp)
                Spacer(modifier = Modifier.height(12.dp))
                Row(horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
                    Column {
                        Text("Prep", color = SoftText, fontSize = 9.sp, letterSpacing = 0.08.sp)
                        Text("14 min", color = DarkText, fontWeight = FontWeight.Bold, fontSize = 12.sp)
                    }
                    Column {
                        Text("Serves", color = SoftText, fontSize = 9.sp, letterSpacing = 0.08.sp)
                        Text("2 people", color = DarkText, fontWeight = FontWeight.Bold, fontSize = 12.sp)
                    }
                }
            }
        }
    }
}

@OptIn(ExperimentalComposeUiApi::class)
@Composable
private fun TestimonialCard() {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(24.dp))
            .background(Color(0xFF121212))
            .padding(18.dp)
    ) {
        Box(
            modifier = Modifier
                .size(180.dp)
                .offset(x = (-20).dp, y = (-20).dp)
                .background(Color.White.copy(alpha = 0.12f), shape = CircleShape)
                .blur(30.dp)
        )
        Box(
            modifier = Modifier
                .size(220.dp)
                .align(Alignment.BottomEnd)
                .offset(x = 25.dp, y = 30.dp)
                .background(Color(0xFFD69055).copy(alpha = 0.45f), shape = CircleShape)
                .blur(28.dp)
        )

        Column(modifier = Modifier.fillMaxWidth()) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(38.dp)
                        .clip(CircleShape)
                        .background(Brush.linearGradient(listOf(Color(0xFFF5D0A8), Color(0xFFD69055))))
                ) {
                    AsyncImage(
                        model = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
                        contentDescription = "Sophia Hart",
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.fillMaxSize()
                    )
                }
                Spacer(modifier = Modifier.width(12.dp))
                Column {
                    Text("Sophia Hart", color = Color.White, fontWeight = FontWeight.Bold)
                    Text("Food Blogger", color = Color.White.copy(alpha = 0.62f), fontSize = 10.sp)
                }
            }
            Spacer(modifier = Modifier.height(14.dp))
            Text(
                text = "\"The flavor balance is incredible — every dish feels fresh, vibrant, and thoughtfully made, with a warm, premium presentation.\"",
                color = Color.White.copy(alpha = 0.85f),
                lineHeight = 24.sp,
                fontSize = 15.sp
            )
        }
    }
}

@Composable
private fun AboutScreen() {
    val stats = listOf("8 years" to "In the business", "45 chefs" to "Passionate team", "1,200+" to "Meals served")
    val values = listOf(
        "Seasonal ingredients" to "We work with carefully chosen produce and local suppliers.",
        "Balanced cooking" to "Fresh, vibrant, and comforting flavors in every plate.",
        "Warm hospitality" to "Our team welcomes guests like part of the family."
    )

    LazyColumn(
        modifier = Modifier.fillMaxSize().padding(horizontal = 20.dp, vertical = 16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(18.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column(modifier = Modifier.weight(1.4f), verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Text("About Us", color = DarkText, fontWeight = FontWeight.Bold, fontSize = 28.sp)
                    Text(
                        "We believe slow food deserves a beautiful table — thoughtful ingredients, balanced recipes and warm service that turns every meal into a memory.",
                        color = SoftText,
                        lineHeight = 24.sp
                    )
                }
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(220.dp)
                        .clip(RoundedCornerShape(24.dp))
                ) {
                    AsyncImage(
                        model = "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
                        contentDescription = "Restaurant interior",
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.fillMaxSize()
                    )
                }
            }
        }

        item {
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp), modifier = Modifier.fillMaxWidth()) {
                stats.forEach { (value, label) ->
                    Card(
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(20.dp),
                        colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.7f))
                    ) {
                        Column(modifier = Modifier.padding(vertical = 18.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(value, color = DarkText, fontWeight = FontWeight.Bold, fontSize = 18.sp)
                            Text(label, color = SoftText, fontSize = 9.sp, lineHeight = 14.sp)
                        }
                    }
                }
            }
        }

        items(values) { (title, desc) ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(22.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.7f))
            ) {
                Column(modifier = Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                    Text(title, color = DarkText, fontWeight = FontWeight.Bold)
                    Text(desc, color = SoftText, lineHeight = 22.sp)
                }
            }
        }
    }
}

@Composable
private fun MenuScreen() {
    val items = listOf(
        MenuItem("Crunchy Citrus Bowl", "$18", "Avocado, greens, orange, seeds, sesame dressing.", "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80", Peach),
        MenuItem("Garden Glow Salad", "$16", "Romaine, cucumber, herbs, radish and lemon vinaigrette.", "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80", OliveGreen),
        MenuItem("Harvest Quinoa", "$20", "Quinoa, roasted vegetables, feta and tahini drizzle.", "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80", Terracotta),
        MenuItem("Sunrise Greens", "$17", "Spinach, kiwi, mango, basil and citrus dressing.", "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80", Sand)
    )

    LazyColumn(
        modifier = Modifier.fillMaxSize().padding(horizontal = 20.dp, vertical = 16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Text("Signature dishes", color = DarkText, fontWeight = FontWeight.Bold, fontSize = 28.sp)
        }
        items(items) { item ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.7f))
            ) {
                Row(modifier = Modifier.padding(14.dp), verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(110.dp)
                            .clip(RoundedCornerShape(18.dp))
                            .background(Brush.linearGradient(listOf(item.tint, Color.White.copy(alpha = 0.2f))))
                    ) {
                        AsyncImage(
                            model = item.image,
                            contentDescription = item.name,
                            contentScale = ContentScale.Crop,
                            modifier = Modifier.fillMaxSize()
                        )
                    }
                    Spacer(modifier = Modifier.width(14.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(item.name, color = DarkText, fontWeight = FontWeight.Bold)
                            Text(item.price, color = Color(0xFFD69055), fontWeight = FontWeight.Bold)
                        }
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(item.description, color = SoftText, lineHeight = 22.sp)
                    }
                }
            }
        }
    }
}

@Composable
private fun ContactScreen() {
    val cards = listOf(
        "Phone" to "+33 1 84 90 12 44",
        "Address" to "12 Rue des Fables, Paris",
        "Hours" to "Mon-Sun • 11:30 - 22:30"
    )

    LazyColumn(
        modifier = Modifier.fillMaxSize().padding(horizontal = 20.dp, vertical = 16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(28.dp))
                    .background(Brush.linearGradient(listOf(Color(0xFFFAF4EE), Color(0xFFF4DED0))))
                    .padding(18.dp)
            ) {
                Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                    Text("Contact", color = DarkText, fontWeight = FontWeight.Bold, fontSize = 28.sp)
                    AsyncImage(
                        model = "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80",
                        contentDescription = "Restaurant entrance",
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.fillMaxWidth().height(180.dp).clip(RoundedCornerShape(18.dp))
                    )
                }
            }
        }

        items(cards) { (title, value) ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(22.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.7f))
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    Text(title, color = Color(0xFFD69055), fontWeight = FontWeight.Bold, fontSize = 11.sp, letterSpacing = 0.1.sp)
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(value, color = DarkText, fontWeight = FontWeight.Bold)
                }
            }
        }

        item {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.7f))
            ) {
                Column(modifier = Modifier.padding(18.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                    Text("Book a Table", color = DarkText, fontWeight = FontWeight.Bold, fontSize = 24.sp)
                    OutlinedTextField(value = "", onValueChange = {}, modifier = Modifier.fillMaxWidth(), label = { Text("Name") })
                    OutlinedTextField(value = "", onValueChange = {}, modifier = Modifier.fillMaxWidth(), label = { Text("Date") })
                    Button(
                        onClick = {},
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2D211D)),
                        shape = RoundedCornerShape(14.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text("Send Request")
                    }
                }
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun MetyPreview() {
    MetyTheme {
        MetyNavigationApp()
    }
}